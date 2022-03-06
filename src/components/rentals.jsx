import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEndDate, getRentals } from "../services/fakeRentalService";

function Rentals(props) {
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    setRentals(getRentals());
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Products</h1>
      {rentals.map((rental) => (
        <div
          key={rental._id}
          className="card shadow"
          style={{ width: "auto", marginLeft: "auto", margin: 20 }}
        >
          <div className="card-body">
            <h5 className="card-name">Name: {rental.name}</h5>
            <h5 className="card-type">Type: {rental.type}</h5>
            <h5 className="card-price">Price: {rental.price}</h5>
            <h5>Available:</h5>
            <h5 className="card-start"> From: {rental.start}</h5>
            <h5 className="card-start">
              To:
              {getEndDate(rental.start, rental.period)}
            </h5>
            <Link
              to={`/movies/${rental._id}`}
              style={{ margin: 20 }}
              className="btn btn-primary"
            >
              Book
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rentals;
