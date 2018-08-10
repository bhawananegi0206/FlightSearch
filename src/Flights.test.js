import React from 'react';
import { configure, shallow ,mount} from 'enzyme';
import { expect } from 'chai';
import Flights from './components/flightdetails/Flights';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });
let store,initialstate;
initialstate ={"flight": {
  "id": 1,
  "airline_code": "indigo",
  "airline": "Indigo",
  "number": "SJ-111",
  "from": "PUNE",
  "to": "DELHI",
  "from_code": "PNQ",
  "to_code": "DEL",
  "depart_date": "Sun Jul 22 2018 17:03:07 GMT+0530 (IST)",
  "arrive_date": "Sun Jul 22 2018 19:03:07 GMT+0530 (IST)",
  "price": 3000,
  "ticketavailable":4,
  "return_trip": {
    "airline": "indigo",
    "number": "SJ-211",
    "from": "DELHI",
    "to": "PUNE",
    "from_code": "DEL",
    "to_code": "PNQ",
    "depart_date": "Mon Jul 23 2018 10:03:07 GMT+0530 (IST)",
    "arrive_date": "Mon Jul 23 2018 12:03:07 GMT+0530 (IST)",
    "price": 3500,
    "ticketavailable":3
  }
}, "searchstring": ""};
store = mockStore(initialstate);

describe('Flights', () =>
it("component should render", () =>{
const component = shallow(<Flights store={store}/>);
expect(component).to.exist;
}),

it("error message should be shown in case of no records", () =>{
  const component = mount(<Flights store={store}/>);
  initialstate ={"flight": "", "searchstring": ""};
  component.props.flights = initialstate;
  expect(component.find(".flight_noavailable")).to.have.length(1);
  })

);


