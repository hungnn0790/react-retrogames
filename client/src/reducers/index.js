// We import the combineReducers function
import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import games from './games'; 
import filestack from './filestack';
import auth from './auth';
import routing from './routing';
import { reducer as toastr} from 'react-redux-toastr'

// combineReducers merges them all!
export default combineReducers({
  games,
  form,
  filestack,
  auth,
  routing,
  toastr
});