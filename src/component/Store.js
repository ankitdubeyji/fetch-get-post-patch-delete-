import { createStore, applyMiddleware } from "redux";
import { apiGet } from "./Apifetch";
import thunk from "redux-thunk";

const initialState = {
  users: [],
  /*it is the initial state of the users variable which we created before using 
useState when fetching first time all data from an API*/
};

/*Define an action that will fetch the data from the API and 
store it in the store*/
export const getUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_USERS_REQUEST" });
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((users) => {
        dispatch({ type: "GET_USERS_SUCCESS", payload: users });
      })
      .catch((error) => {
        dispatch({ type: "GET_USERS_FAILURE", payload: error });
      });
  };
};
// return async(dispatch) => {
//   try {
//     dispatch({type: "GET_USERS_REQUEST"});
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//     const users = await response.json();
//     dispatch({ type: "GET_USERS-SUCCESS", payload: users });
// /*replace the setUsers function in Home.js that we're using to update
// the state, with the dispatch function from react-redux:*/
//   } catch (error) {
//     dispatch({ type: "GET_USERS_FAILURE", payload: error });
//   }
// }
// };

// Define a reducer that will update the state based on the action type
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return state;
    case "GET_USERS_SUCCESS":
      return { ...state, users: action.payload };
    case "GET_USERS_FAILURE":
      return { ...state, users: [] };
    default:
      return state;
  }
};

//create the store
const store = createStore(reducer, applyMiddleware(thunk));
export default store;

/*dispatch: This is a function provided by the react-redux library 
that is used to dispatch an action to the Redux store. It takes an 
object as its argument, which represents the action that needs to 
be dispatched.

type: This is a property of the action object that identifies the 
type of action being dispatched. It is a string that describes what 
kind of action is being performed.

"GET_USERS_SUCCESS": This is the value of the type property of the 
action object. It is a string constant that represents the type of 
action being dispatched, which in this case is a success response 
to fetching user data from an API. It is typically written in all 
caps with words separated by underscores for readability.

payload: This is a property of the action object that contains the 
data being sent to the Redux store. It is an optional property that 
can be used to pass additional data along with the action. In this 
case, it contains the users data fetched from the API.

users: This is the variable that contains the data returned from 
the API call in the try block of the code. It represents an array 
of user objects that will be stored in the Redux store.

we can write anything else instead of "GET_USERS_SUCCESS", 
we can use any string that describes the type of action 
being dispatched. However, it is recommended to use a descriptive 
string that follows a consistent naming convention, such as all 
caps with underscores, to make it easier to identify the action 
type in your codebase.*/


/*In layman's terms, Redux Thunk is a middleware library for 
Redux that allows you to write asynchronous logic, such as 
API calls, inside your Redux actions. This means that you 
can dispatch an action that triggers an API call, and then 
update the Redux state based on the result of that API call.

In technical terms, Redux Thunk is a middleware that intercepts 
actions before they are processed by the Redux store. If an 
action is a function instead of a plain object, Redux Thunk 
invokes that function with two arguments: dispatch and getState. 
This allows the function to dispatch other actions, including 
asynchronous ones, and access the current state of the store.

In simple language, Redux Thunk is a tool that helps you handle 
asynchronous actions in your Redux application. It allows you 
to write actions that contain logic for making API calls or 
other asynchronous operations, and then update the Redux state 
based on the results of those operations. Without Redux Thunk, 
handling asynchronous actions in Redux can be difficult and 
lead to complex code, but with it, you can simplify your code 
and make it more maintainable.*/
