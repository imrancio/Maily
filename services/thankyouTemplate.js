const keys = require("../config/keys");

module.exports = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"> 
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <title>Maily</title>
    </head>

    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        <div style="text-align: center;">
          <i class="material-icons" style="font-size: 8rem;">mail_outline</i>
          <h3 style="font-family: Roboto, sans-serif">Thank you for your response!</h3>
        </div>
      </div>
    </body>
  `;
};
