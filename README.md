# RSVME

This is a full-stack application to allow users to reserve tables at restaurant. Optimizations and changes are made daily to meet high customer satisfaction and UI experience.


## How It's Made:
** Tech Used: ** Front-end: React, Passport.JS, Axios; Back-end: Node.Js, Express, Passport.JS and MongoDB

The objective of this project reduce time and increase customer satisfaction at restaurants based on the table selected by the customer. In the front-end, we render a navbar and home component and with react router we can render other components based on the state of the App.js. Users can click on the selections on the navbar to navigate to other pages (ex. login page or signup page) and after successfully login or signup, we render our main reservation component and update the navbar. Successfully navigating to different pages (or components) is by setting the `redirectTo:` state on the App.js. The reservation component will only render if `loggedIn` state is set to true, and happens when the user successfully logs in or signs up. Using the `componentDidMount` lifecycle on the reservation component, two functions are invoked. One is to fetch from the database all reservations and set those objects in an array in the state, the other is to build timeSlots for the time component and is set in the reservation state in an array and passed down as a prop. 

## Optimization:

Avoid using declaration functions, express functions bypasses the binding of the keyword `this` in the constructor.
Removed form on current page. Users' no longer need to enter their information to submit a reservation. Adjusted passport.js to accept a customer profile and return a response of customer information as an object. Passing those values down props and using object deconstruction to access and set state. Successfully allow users to click on table, render the form as a modal and post to the database. Next step is to develop a form submitted modal. Still optimizing the project to have customers' profile, restaurants' profile, and secure payments through the app. Pushing for a mobile development on React Native.

Backend: Improvements are still to be made, moving to a more secure module.exports coding pattern and validate users' information before successfully posting to the database. 

More ideas to come as progess is being made.

## Leason Learned

The React Framework is asychronous so have to be aware of race conditions, the bind of the keyword `this` to functions but using express functions avoid these bindings. Moving to Redux for a better state management; canceling network requests on instances no longer mounted, changing/updating state to users interaction with the app.

## Installation

1. Fork Repo
2. Clone Repo
3. cd /react then `npm install`
4. cd /backend then `npm install`

## Usage

** Both react and backend must be runnning **
1. cd /react `npm run dev` (Starts React and Passport)
2. cd /backend `npm start`
3. Navigate to `localhost:3000`


## Contribution

I would love some feedback on how to improve this project. If you have any questions or comments please reach out through email: edwinx.naranjo@gmail. I look forward to building an amazing app with you!
