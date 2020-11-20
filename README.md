# wallzoe app.

## Installation - run following commands from root folder

#### Configuration

    $ cd server
    $ npm install
    $ cp .env-example .env
    $ cd config
    $ cp default.json development.json
    $ cp custom-environment-variables-default.json custom-environment-variables.json

### Take three distinct terminal/cmd

#### Terminal/cmd #1 Run typescript compiler

    $ cd server
    $ tsc -w

#### Terminal/cmd #2 Run backend server

    $ cd server
    $ npm start

#### Terminal/cmd #3 Run frontend server

    $ cd client
    $ yarn install
    $ yarn start
