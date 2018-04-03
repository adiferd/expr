# publicAPI

## Prerequisited

1. `Git-scm`
2. `Nodejs` ver v8.1.3
3. Database server (`mysql`)
4. etc


## Getting Started

1. Clone this repository
  ```
  $ git clone ...
  ```
2. Install project dependencies
  ```
  npm install
  ```
3. Setting up your local environment on `config/local`. The configuration values
is using json type file
  ```
  app.json - setup your port, host, and secret key
  database.json - setup database environment
  facebook.json - setup facebook webhook verification key
  cms.json - setup cms varification token
  ```
4. Test your local environment server. You can set your `NODE_ENV` value manually,
default value is `local` node environment.
  ```
  NODE_ENV=local npm start
  ```
  or you can just `export` your `NODE_ENV` and run `npm start`

### Scafolding
  ```
  app/
      contollers/
      helpers/
      kernels/
      middlewares/
      models/
      routes/
      services/
  bin/
      www
  config/
      local/
        app.json
        database.json
        facebook.json
        cms.json
        security.json
      staging/
      production/
  app.js
  package.json
  .gitignore
  readme.md
  ```
