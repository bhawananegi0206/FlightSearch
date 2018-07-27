import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import InputRange from 'react-input-range';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-input-range/lib/css/index.css';

import './search.css';

class Search extends Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      returnTrip: true,
      departureDate: moment(),
      returnDate: moment().add(1, 'day'),
      passengers: 1,
      price: {
        min: 0,
        max: 10000,
      },
      cities:["DELHI","PUNE","GOA","JAIPUR","MUMBAI"],
      passenger:["1","2","3","4","5","6","7","8","9","10"]
    }
  }

  handleSearch(event) {
    this.props.handleSearch({
      flights: this.props.flights,
      searchstring: {
        returnTrip: this.state.returnTrip,
        originCity: this.originCity.value,
        destinationCity: this.destinationCity.value,
        departureDate: this.state.departureDate,
        returnDate: this.state.returnDate,
        passengers: this.passengers.value,
        price: this.state.price
      }
    });
    event.preventDefault();
  }

  refineSearch(price) {
    const { store } = this.context;
    store.dispatch({
      type: 'PRICE_FILTER',
      price: this.state.price
    });
  }
  handleTrip(tab) {
    let returnTrip = (tab === 1) ? false : true;
    this.setState({ returnTrip });
  }

  changeDepartureDate(departureDate) {
    this.setState({ departureDate: moment(departureDate._d) });
  }

  changeReturnDate(returnDate) {
    this.setState({ returnDate: moment(returnDate._d) });
  }


  render() {

    return (
      <div className="search__box">
        <ul className="tabs">
          <li className={"tab first" + (this.state.returnTrip ? '' : ' active')}
            onClick={this.handleTrip.bind(this, 1)}>One way</li>
          <li className={"tab" + (this.state.returnTrip ? ' active' : '')}
            onClick={this.handleTrip.bind(this, 2)}>Return</li>
        </ul>

        <form className="form" onSubmit={this.handleSearch}>
          <input
            className="input block origincity"
            type="text"
            placeholder="Enter Origin City"
            ref={node => {
              this.originCity = node;
            }} required list="mylist" />
            <datalist id="mylist">
            {this.state.cities.map((item) =>
                    <option value={item} />
            )}
           </datalist>

          <input
            className="input block destinationcity"
            type="text"
            placeholder="Enter Destination City"
            ref={node => {
              this.destinationCity = node;
            }} required list="listdestination"/>
            <datalist id="listdestination">
            {this.state.cities.map((item) =>
                    <option value={item} />
            )}
           </datalist>

          <br />

          <div>
            <label className="block">Departure date</label>
            <DatePicker
              className="input"
              selected={this.state.departureDate}
              onChange={this.changeDepartureDate.bind(this)} required />
          </div>

          {this.state.returnTrip &&
            <div>
            <br />
              <label className="block">Return date</label>
              <DatePicker
                className="input"
                selected={this.state.returnDate}
                onChange={this.changeReturnDate.bind(this)} required />
            </div>
          }

          <div className="passengers">
            <input
            className="input block passengers"
            type="text"
            placeholder="Passengers"
            ref={node => {
              this.passengers = node;
            }} required list="passengerscount"/>
            <datalist id="passengerscount">
            {this.state.passenger.map((item) =>
                    <option value={item} />
            )}
           </datalist>
          </div>

          <div className="price-range__label">
            <label>Price range</label>
          </div>

          <InputRange
            className="price--range"
            maxValue={10000}
            minValue={0}
            formatLabel={price => `₹ ${price}`}
            value={this.state.price}
            onChange={price => this.setState({ price })}
            onChangeComplete={price => console.log(price)} />

          <button className="form__submit" type="submit">Search</button>

        </form>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    flights: state.flights,
    searchstring: state.searchstring
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (data) => dispatch({ state: data, type: "all" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);