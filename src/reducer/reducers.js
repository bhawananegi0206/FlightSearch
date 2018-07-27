
import FLIGHTS from './flights-information';
const initialstate = { "flights": FLIGHTS, "searchstring": "" };


const flightinfo = (state = initialstate, action) => {
  switch (action.type) {
    case 'PRICE_FILTER':
      return {
        ...action,
        price: action.price
      }
    case 'all':
      return Object.assign({}, state, action.state);
    default:
      return Object.assign({}, state, action);
  }
}

export default flightinfo;