# RSVME

This is a full-stack application to allow users to reserve tables at restaurant. Still under development.


## How It's Made:
** Tech Used: ** React, Node.Js, Express, Passport.JS and MongoDB

The objective of this project reduce time and increase customer satisfaction at restaurants based on the table selected by the customer. This is using React front-end and Express and MongoDb at the back end. Still under development to a more complete product.

## Optimization:

Currently using declaration functions but moving to express functions to avoid extra lines of bind keyword `this` to the function. Using object destructuring to access key/pair value with less lines of codes. Be aware of `{ propName } = this.state`. Finding a way to prevent page reload and confirm a successful reservation post. Still optimizing the project to have customers' profile, restaurants' profile, and secure payments through the app. Also push for a mobile development.

More ideas to come as progess are made.

## Leason Learned

The React Framework is asychronous so have to be aware of race conditions, the bind of the keyword `this` to functions but using express functions avoid those bindings. Still more to come as development continues.

## Installation

1. Fork Repo
2. Clone Repo
3. cd /react then `npm install`
4. cd /backend then `npm install`

## Usage

** Both react and backend must be runnning **
1. cd /react `npm run dev` (Starts React and Passport)
2. cd /backend `npm start`
3. Navigate to `localhost:3000 to`
