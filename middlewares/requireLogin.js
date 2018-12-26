module.exports = (req, res, next) => {
  // no authenticated user assigned by passport
  if (!req.user) {
    return res.status(401).send({ error: "You must be logged in!" });
  }
  // otherwise move on to next request handler
  next();
};
