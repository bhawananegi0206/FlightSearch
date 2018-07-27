import React, { Component } from 'react';
import moment from 'moment';
import './flights.css'

class FlightDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReturnTrip: true,
      bookingText: 'Book this flight'
    }
  }


  render() {
    let flight = this.props.flight;
    flight.depart_time = moment(flight.depart_date).format("hh:mm A");
    flight.arrive_time = moment(flight.arrive_date).format("hh:mm A");

    let returnTrip = flight.return_trip;
    returnTrip.depart_time = moment(returnTrip.depart_date).format("hh:mm A");
    returnTrip.arrive_time = moment(returnTrip.arrive_date).format("hh:mm A");    

    return (
      <div className="flight" ref="flightRef">
        <div className="flightinfo__details">
          <h3 className="flightinfo__price">₹ {flight.price}</h3>

          <div className="flightinfo__timings">
            <div className="flightinfo__departure">
              <p className="flightinfo__number">{flight.number.toUpperCase()}</p>
              <p className="flightinfo__codes">{flight.from_code} &raquo; {flight.to_code}</p>
              <p className="flightinfo__depart__time">Depart: {flight.depart_time}</p>
              <p className="flightinfo__arrive__time">Arrive: {flight.arrive_time}</p>
            </div>

            { 
              this.state.isReturnTrip &&
              <div className="flightinfo__return">
                <p className="flightinfo__number">{returnTrip.number.toUpperCase()}</p>
                <p className="flightinfo__codes">{returnTrip.from_code} &raquo; {returnTrip.to_code}</p>
                <p className="flightinfo__depart__time">Depart: {returnTrip.depart_time}</p>
                <p className="flightinfo__arrive__time">Arrive: {returnTrip.arrive_time}</p>
              </div>
            }
          </div>

        </div>

        <div className="flightinfo__logo">
          <div className={`airline ${flight.airline_code}`}></div>
          <button 
            className="booking--button"
            onClick={() => this.setState({bookingText: 'Booked'})}>
            {this.state.bookingText}
          </button>

          <div className="flight_availableseats">
            Seats Available {flight.ticketavailable}
          </div>
        </div>
      </div>      
    );
  }

 }


export default FlightDetails;