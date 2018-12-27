const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const thankyouTemplate = require("../services/thankyouTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    // find user surveys
    const surveys = await Survey.find({ _user: req.user.id })
      .select({
        // excluding the recipients list field
        recipients: false
      })
      // sort by newest surveys
      .sort({ dateSent: -1, lastResponded: -1 });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send(thankyouTemplate());
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    // email redirects back to this API endpoint
    const p = Path.createPath("/api/surveys/:surveyId/:choice");
    // sendgrid returns list of event objects periodically
    _.chain(req.body)
      .map(({ email, url }) => {
        if (url) {
          // match both surveyId and choice in clicked URL
          const match = p.test(new URL(url).pathname);
          if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice };
          }
        }
      })
      // get rid of unmatched (falsy) events
      .compact()
      // unique email and surveyId pairs - remove multi-click events
      .uniqBy("email", "surveyId")
      // each unique click event
      .each(({ surveyId, email, choice }) => {
        // update one record
        Survey.updateOne(
          {
            // find survey with surveyId
            _id: surveyId,
            recipients: {
              // match recipient subdocument with email / not responded
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // increment survey choice (yes|no) count by one
            $inc: { [choice]: 1 },
            // set recipients elemMatch subdocument responded as true
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    // send sendgrid empty response
    res.send({});
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      // comma-sep emails -> array of recipient objects
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // send email using sendGrid API
    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
