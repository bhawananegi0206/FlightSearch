import React from 'react';
import { configure, shallow ,mount} from 'enzyme';
import { expect } from 'chai';
import App from './App';
import Header from './components/header/Header';
import Search from './components/searchdetails/Search';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('main component exists', function() {
    const wrapper = shallow(<App />); 
    expect(wrapper).to.have.length(1);
  })
  it('h1 heading exists', function() {
    const headercontainer = shallow(<Header />); 
    const h1 = headercontainer.find("h1");
    expect(h1).to.have.length(1);
  })

});

describe('Search component testing', function() {
  // Search functionality testing
    let store,initialstate;
    initialstate ={"flights": {}, "searchstring": ""};
    store = mockStore(initialstate);
    
    it('search button field should be present', function() {
     
      const searchwrapper = mount(<Search  store={store} />);  
      expect(searchwrapper.find("button")).to.have.length(1);
    })
  
    it('Should call the submit function when clicked', () => {
      const submitMock = jest.fn();
      const component = mount(<Search store={store} />);
      expect(submitMock.mock.calls.length).to.exist;
      component.find('form').simulate('submit');
      expect(submitMock.mock.calls.length).to.exist;
    });
   
  });
