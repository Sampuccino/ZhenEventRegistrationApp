//fetch all users
export const FETCH_USERS = "FETCH_USERS";

//update current user id
export const UPDATE_USER = "UPDATE_USER";

//update show user for profile or selecting another user
export const UPDATE_SHOW_USER = "UPDATE_SHOW_USER";

//update current user information including the events they created and are attending
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

//update show user information
export const UPDATE_SHOW_USER_INFO = "UPDATE_SHOW_USER_INFO";

//update show event
export const UPDATE_SHOW_EVENT_INFO = "UPDATE_SHOW_EVENT_INFO";

//should events render user's events (false) or all events (true). Default is true
export const RENDERED_EVENTS = "RENDERED_EVENTS";

//create a new event
export const CREATE_EVENT = "CREATE_EVENT";

export const UPDATE_EVENT_TIME = "UPDATE_EVENT_TIME";

//switch tab navigator
export const UPDATE_TAB = "UPDATE_TAB";

//*******************
//set a new user details
export const SET_USER = "SET_USER";

// Set logged in
export const SET_AUTENTICATED = "SET_AUTENTICATED";

// Update logged in
export const UPDATE_AUTENTICATED = "UPDATE_AUTENTICATED";

//fetch all events
export const FETCH_EVENTS = "FETCH_EVENTS";

// find a single event
export const FIND_EVENT_DETAILS = "FIND_EVENT_DETAILS";

// fetch a single event
export const FETCH_EVENT_DETAILS = "FETCH_EVENT_DETAILS";

// set search results
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

// set search result details
export const SET_SEARCH_RESULT_EVENT_DETAILS =
  "SET_SEARCH_RESULT_EVENT_DETAILS";

// update checklist if "event" prop filter used
export const UPDATE_EVENT_CHECKLIST = "UPDATE_EVENT_CHECKLIST";

// update checklist if "search" prop filter used
export const UPDATE_EVENT_SEARCH_CHECKLIST = "UPDATE_EVENT_SEARCH_CHECKLIST";

// set profile tab events whether tab 1 or 2
export const SET_PROFILE_TAB_EVENTS = "SET_PROFILE_TAB_EVENTS";
// set profile tab details
export const SET_PROFILE_TAB_EVENT_DETAILS = "SET_PROFILE_TAB_EVENT_DETAILS";
// update event details
export const UPDATE_PROFILE_EVENT_DETAILS = "UPDATE_PROFILE_EVENT_DETAILS";
export const FETCH_TAB_EVENTS = "FETCH_TAB_EVENTS";
