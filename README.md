# Contact API

Repository for the MongoDB Atlas Hackathon, Category "Action Star". 
This project is a web API designed to support a contact form. The
API uses MongoDB Realm Triggers to send an email notification to
both the owner of the contact form and the email address listed by
the form user. Built with Typescript/Nest.js.

## Getting Started

Clone the project locally:

    git clone https://github.com/ddgroleau/contact-api.git

## Prerequisites

Install Node.js >= v16.13
- [Node.js Download](https://nodejs.org/en/)

Install Docker
- [Docker Engine Install](https://docs.docker.com/engine/install/)

Install Docker-Compose
- [Docker Compose Install](https://docs.docker.com/compose/install/)


## Installation

To get the development environment running:

1. Install dependencies

    yarn install

3. Create a .env file with the following variables:

  - MONGODB_PASSWORD - Your MongoDB Atlas Password
  - MONGODB_DATABASE - Your MongoDB Atlas Database
  - EMAIL_DAEMON - The email address you wish to use for the notification service.
  - MAIL_SUBJECT - The subject of the email sent to form users.
  - MAIL_MESSAGE - The body of the email sent to form users.
  - PORT=3000 - Assign to port 3000.

  - The following variables are used with the gmail API. To configure your gmail
    for use with the API, follow [these instructions]
    (https://masashi-k.blogspot.com/2013/06sending-mail-with-gmail-using-xoauth2.html).

    - CLIENT_ID
    - CLIENT_SECRET
    - REFRESH_TOKEN
    - ACCESS_TOKEN

2. Start the development server:

    yarn start:dev

3. You can then initiate HTTP requests to [localhost:3000](http://localhost:3000).


## Docker

Build and run the docker image locally:

    docker-compose --build up

Push to DockerHub:

    docker tag contact-api <repo>/contact-api
    docker push contact-api <repo>/contact-api


## Running the tests

1. For unit tests:

    yarn test

2. For End-To-End tests:

    yarn test:e2e


## Deployment

This API is running inside a docker container, currently deployed to https://ddgroleau-api.herokuapp.com/. 


## Built With

  - [TypeScript](https://www.typescriptlang.org/)
  - [NestJS](https://nestjs.com/)


## Author

  - **Dan Groleau**


## License

This project is licensed under the [Apache License 2.0](LICENSE.md)- see [LICENSE.md](LICENSE.md) for
details.


## Acknowledgments

  - Thank you to [DEV](https://dev.to/) and [MongoDB](https://www.mongodb.com/) for sponsoring and hosting the [Hackathon](https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-on-dev-4b6m).
