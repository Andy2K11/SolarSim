# Installation and Setup

See [Git Gist](https://gist.github.com/Andy2K11/ad10d1a6bd42dea98720bed6a91749f5)

## Express

To create an express project in the current folder:

    express --view hbs --css sass --git

    npm i --save bcrypt helmet jsonwebtoken passport passport-jwt mongoose mongoose-unique-validator

    npm i --save-dev nodemon

When installing nodemon locally you need to run it from a npm script

* App.js : change SASS middleware indentedSyntax to false
* Add Angular app dist folder as express.static *after* the routes
* Add [helmet](https://expressjs.com/en/advanced/best-practice-security.html)

## Angular

    ng new --help

In the root of your express project create a new ng project as part of the express git repo

    ng new my-app --routing --style scss --skip-git --skip-install --d

    npm i --save ngx-bootstrap bootstrap

Then in .angular-cli.json add the styles entry for bootstrap

    "styles": [
         "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css",
      ],

When ready (to make a cup of tea)

    npm install

    ng build -w

## Appendix

### Useful windows search

    .md -folder:node_modules -folder:vendor -folder:actualise
