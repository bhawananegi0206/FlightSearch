
import FLIGHTS from './flights-information';
const initialstate = { "flights": FLIGHTS, "searchstring": "" };


const flightinfo = (state = initialstate, action) => {
  switch (action.type) {
    case 'all':
      return Object.assign({}, state, action.state);
    case 'updateseats':
    return Object.assign({}, state, action);
    default:
      return Object.assign({}, state, action);
  }
}

export default flightinfo;