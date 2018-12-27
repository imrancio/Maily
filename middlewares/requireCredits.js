module.exports = (req, res, next) => {
  // no authenticated user assigned by passport
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "Not enough credits!" });
  }
  // otherwise move on to next request handler
  next();
};
