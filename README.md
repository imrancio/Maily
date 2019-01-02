# Maily

Maily is a project I worked on while learning MERN full-stack development on Udemy. 
It is a web application that allows its users to send email surveys with a question and get some feedback in real-time. 
A fully functional production version of the application has been deployed to [Heroku](https://infinite-garden-31915.herokuapp.com), so go ahead and check it out! 
Billing has been implemented, but not activated. You may use the test card no. `4242 4242 4242 4242` with any other valid fields to add credits to your account for free.
After sending out a survey, click 'Yes' or 'No' link on the email to see the stats periodically update on the application without reload.

## Development

The back-end of the application runs on MongoDB and an Express.js REST API server. 
MongoDB stores all the user and survey information related to the application.
The API server is responsible for communicating with MongoDB / 3rd-party API services, then returning results to the front-end client.
The front-end of the application runs on React + Redux. 
React handles rendering of the client-side components that the user sees and Redux is used to improve state-management across all different components. 
Client-side components are styled with the [Materialize CSS](https://materializecss.com/) framework to shorten development time, while still following Material Design principles.

## 3rd-party APIs

This application makes use of several 3rd-party API services. 
[Google+ API](https://console.developers.google.com/apis/library/plus.googleapis.com) is used for the OAuth2.0 flow for signing in with your Google account.
[Stripe API](https://stripe.com/docs/api) is used for billing and charging credit/debit cards for payment to use the service.
[SendGrid API](https://sendgrid.com/docs/API_Reference/index.html) is used for actually sending emails and for monitoring click-tracking events on the emails.

## Testing Setup

```
git clone https://github.com/imrancio/Maily.git
cd Maily
```
If you would like to test the application locally on Linux or macOS with Node.js, some initial setup is required.
First, you must get all the API keys mentioned above by signing up for (free) accounts on their respective links.
Also, create a project on your [Google Developer Console](https://console.developers.google.com) for Google+ API and OAuth web-application credentials.
Second, set up your MongoDB instance either locally or through a service like [mLab](https://mlab.com/).
Next, copy all the contents of `config/prod.js` to a new file `config/dev.js`. This file will be ignored by git.
Then, replace all 'process.env...' variables to JavaScript strings of your "API_KEYS".
The following list describes all the information needed to run the application:

* googleClientID: OAuth client ID credential for Google+ API
* googleClientSecret: Secret created with the ID above
* mongoURI: Link to the MongoDB instance to be used by the application (i.e. "mongodb://...")
* cookieKey: Any random string of alpha-numeric characters used to encrypt cookie data
* stripePublishableKey: Stripe API key
* stripeSecretKey: Secret key generated for the Stripe API
* sendGridKey: SendGrid API key
* redirectDomain: Domain where email links should redirect to (i.e. "http://localhost:3000")
* defaultFromEmail: Email address appearing in FROM field by default for all surveys sent

To ensure Google authentication works correctly, add `http://localhost:5000/auth/google/callback` and `http://localhost:3000/auth/google/callback`,
to the "Authorized Redirect URIs" field of the OAuth Client ID in your [Google Developer Console](https://console.developers.google.com).
These are the default routes used by the Express and Create-React-App servers to handle authentication callbacks. 
Finally, replace `imrancio` in `sendgrid_webhook.sh` to any unique user ID or string. Then go to Sendgrid Dashboard -> Settings -> Mail Settings
and turn on all "Event Notifications" with HTTP POST URL: `https://<UNIQUE_ID>.localtunnel.me/api/surveys/webhooks`, replacing `<UNIQUE_ID>` with whatever you chose in `sendgrid_webhook.sh`.
This allows tunnelling all click notification webhooks from SendGrid API to your local Express API server. 

Start the application by running the following commands in the Maily project directory:
```
npm i; npm i --prefix client
npm run dev
```
