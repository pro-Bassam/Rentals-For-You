import React, { useEffect, useState } from "react";
import {
  getEndDate,
  getRental,
  bookRental,
} from "./../services/fakeRentalService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RentalForm(props) {
  const [rental, setRental] = useState({});
  const [errors, setErrors] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const rentalId = props.match.params.id;
    if (rentalId === "new") return;

    const rentalInDB = getRental(rentalId);
    if (!rentalInDB) return props.history.replace("/not-found");
    setRental(rentalInDB);
  }, []);

  const handelSubmit = (event) => {
    event.preventDefault();
    setErrors("");

    const end = getEndDate(rental.start, rental.period);
    const baseStartDate = new Date(rental.start);
    const inputStartDate = new Date(startDate);
    const baseEndDate = new Date(end);
    const inputEndDate = new Date(endDate);
    if (
      baseEndDate >= inputStartDate &&
      inputStartDate >= baseStartDate &&
      baseStartDate <= inputEndDate &&
      inputEndDate <= baseEndDate
    ) {
      if (inputStartDate.toDateString() > baseStartDate.toDateString()) {
        const period = inputStartDate.getDate() - 1 - baseStartDate.getDate();
        const newRental = { ...rental };
        newRental.start = baseStartDate.toDateString();
        newRental.period = period;
        bookRental(newRental);
        props.history.replace("/");
      } else if (
        inputStartDate.toDateString() === baseStartDate.toDateString()
      ) {
        baseStartDate.setDate(inputEndDate.getDate() + 1);
        const period = baseEndDate.getDate() - inputEndDate.getDate() - 1;
        const newRental = { ...rental };
        newRental.start = baseStartDate.toDateString();
        newRental.period = period;
        bookRental(newRental);
        props.history.replace("/");
      }
    } else {
      setErrors("This product is not available at this period");
    }
  };

  return (
    <div>
      <div
        className="card shadow "
        style={{ width: "auto", marginLeft: "auto", margin: 20 }}
      >
        <div className="card-body">
          <h4>You are going to book the Product:</h4>
          <br />
          <h5 className="card-name">Name: {rental.name}</h5>
          <h5 className="card-type">Type: {rental.type}</h5>
          <h5 className="card-price">Price: {rental.price}</h5>
          <h5>Available:</h5>
          <h5 className="card-start"> From: {rental.start}</h5>
          <h5 className="card-start">
            To:
            {getEndDate(rental.start, rental.period)}
          </h5>
        </div>
      </div>
      <div
        className="card shadow"
        style={{ marginLeft: "auto", margin: 20, textAlign: "center" }}
      >
        <div className="card-body">
          <form>
            <h4>Booking now:</h4>
            From:
            <DatePicker
              selected={startDate}
              minDate={new Date()}
              onChange={(date) => setStartDate(Date.parse(date))}
            />
            To:
            <DatePicker
              selected={endDate}
              minDate={startDate}
              onChange={(date) => setEndDate(Date.parse(date))}
            />
            {errors && (
              <div className="alert alert-danger" style={{ margin: 10 }}>
                {errors}
              </div>
            )}
            <button
              style={{ margin: 10, textAlign: "center" }}
              className="btn btn-primary"
              onClick={handelSubmit}
            >
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RentalForm;
