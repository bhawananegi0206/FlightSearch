import React, { Component } from 'react';
import moment from 'moment';

import FlightDetails from './Flight-details';
import './flights.css';
import { connect } from 'react-redux';

class Flights extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReturnTrip: true,
      flights: [],
      searchString: []
    };
  }

  componentDidMount() {
    this.setState({
      isReturnTrip: this.state.returnTrip,
      flights: this.props.flights,
      searchString: this.props.searchstring
    });

  }


  checkFlightAvailability(flight) {
    let searchString = this.props.searchstring;
    let isOriginCityFlight = true,
      isDestinationCItyFlight = true,
      isDepartDateFlight = true,
      isReturnDateFlight = true,
      isFlightWithInPrice = true,
      isFlightAvailable = true;

    if (searchString !== undefined) {
      if (searchString.originCity) {
        isOriginCityFlight = (flight.from.toLowerCase() === searchString.originCity.toLowerCase());
      }

      if (searchString.destinationCity) {
        isDestinationCItyFlight = (flight.to.toLowerCase() === searchString.destinationCity.toLowerCase());
      }

      if (searchString.departureDate) {
        isDepartDateFlight = (flight.depart_date.format("D M YYYY") === searchString.departureDate.format("D M YYYY"));
      }

      if (searchString.returnDate && this.state.isReturnTrip) {
        isReturnDateFlight = (moment(flight.return_trip.depart_date).format("D M YYYY") === moment(searchString.returnDate._d).format("D M YYYY"));
      }

      if (searchString.price) {
        isFlightWithInPrice = (flight.price <= searchString.price.max && flight.price >= searchString.price.min);
      }
      if (searchString.passengers) {
        isFlightAvailable = (flight.ticketavailable >= searchString.passengers);
      }
    }

    return isOriginCityFlight &&
      isDestinationCItyFlight &&
      isDepartDateFlight &&
      isReturnDateFlight &&
      isFlightWithInPrice &&
      isFlightAvailable;
  }

  render() {
    let flightList = [],
      flights,
      flightDetails;
    if (this.props.flights) {

      flights = this.props.flights.filter((flight) => {
        flight.depart_date = moment(flight.depart_date);
        flight.return_trip.depart_date = moment(flight.return_trip.depart_date);
        return this.checkFlightAvailability(flight);
      })

      flightList = flights.map((flight) => {
        return <FlightDetails key={flight.id} flight={flight}></FlightDetails>;
      });
      flightDetails = flights[0];
      if(flightDetails){

      flightDetails = {
        ...flightDetails,
        depart_day: moment(flightDetails.depart_date).format("Do MMM YYYY"),
        return_day: moment(flightDetails.return_trip.depart_date).format("Do MMM YYYY")
      };
    }

    }

    return (
      <section className="flights">
        {flightList.length > 0 &&
          <div className="flights__details">
            <div>
              {this.state.searchString.price &&
                <h2>
                  <span>{flightDetails.from}</span> &raquo;
                  <span> {flightDetails.to} </span>
                  {
                    this.state.isReturnTrip &&
                    <span> &raquo; {flightDetails.from}</span>
                  }
                </h2>
              }

              {!this.state.searchString.price &&
                <div className="flight__headertitle">Check out some of the best fares found</div>
              }

            </div>

            <div className="flight--timings">
              <span>Departure: {flightDetails.depart_day}</span>
              {
                this.state.isReturnTrip &&
                <span>Return: {flightDetails.return_day}</span>
              }
            </div>
          </div>
        }

        {
          flightList.length <= 0 &&
          <div className="flight_noavailable">Sorry, No flights for your selection. Please refine your search!</div>
        }

        <div className="flight__container">
          {flightList}
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    flights: state.flights,
    searchstring: state.searchstring
  }
}

export default connect(mapStateToProps)(Flights);