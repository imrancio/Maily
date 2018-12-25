const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  // in development, front-end relative links will be proxied to expess back-end server
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  // in production, no front-end server required, transpiled to public dir
  // all requests go through express server
};
