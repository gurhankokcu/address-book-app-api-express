# Address Book App API

Address Book App API is a RESTful API service which allows users to list, filter, get, add, edit and delete their contacts.

## Requirements

* [Node.js](https://nodejs.org/en/download/)
* [MySQL](https://www.mysql.com/downloads/)

## Installation

Install Node.js and MySQL using the links above.

Clone the GitHub repository

```bash
$ cd /path/to/destination/
$ git clone https://github.com/gurhankokcu/address-book-app-api-express.git
```

Install npm modules

```bash
$ cd address-book-app-api-express
$ npm install
```

Create MySQL table

```sql
CREATE SCHEMA `address_book` DEFAULT CHARACTER SET utf8;
```

Confirm database name, server, username and password in `/config/config.json` and `/config/default.json`. Update the configuration if necessary.

Run Sequelize migration and seeder scripts to create tables and populate initial data

```bash
$ npm run migrate
$ npm run seed
```

## Usage

Start node server

```bash
$ npm start
```

## Tests

ESLint is used for checking the code style.

```bash
$ npm run lint
```

Jest is used for testing the application. 

```bash
$ npm test
```

## Credits

* [REST API Tutorial](https://www.restapitutorial.com/lessons/httpmethods.html) is used to confirm paths and http status codes
* [Random Name Generator](https://www.random-name-generator.com/?country=united-kingdom&gender=&n=50&s=59504) is used to create sample data


## License
[MIT](https://choosealicense.com/licenses/mit/)
