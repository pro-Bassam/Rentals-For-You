const rentals = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "Toyota",
    type: "Car",
    price: 50000,
    start: "March 13, 2022",
    period: 5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "House",
    type: "apartment",
    price: 700000,
    start: "October 22, 2022",
    period: 10,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "Yacht",
    type: "boat",
    price: 100000,
    start: "November 22, 2022",
    period: 10,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "Bus",
    type: "Bus",
    price: 125000,
    start: "November 15, 2022",
    period: 1,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    name: "Mercedes",
    type: "car",
    price: 1025000,
    start: "March 4, 2022",
    period: 7,
  },
];

export function getEndDate(start, period) {
  const date = new Date(start);
  date.setDate(date.getDate() + period);
  return date.toDateString();
}

export function getRentals() {
  return rentals;
}

export function getRental(id) {
  return rentals.find((r) => r._id === id);
}

export function bookRental(rental) {
  let rentalInDb = rentals.find((r) => r._id === rental._id) || {};
  rentalInDb.name = rental.name;
  rentalInDb.type = rental.type;
  rentalInDb.price = rental.price;
  rentalInDb.start = rental.start;
  rentalInDb.period = rental.period;

  if (!rentalInDb._id) {
    rentalInDb._id = Date.now().toString();
    rentals.push(rentalInDb);
  }

  return rentalInDb;
}

export function deleteRental(id) {
  let rentalInDb = rentals.find((r) => r._id === id);
  rentals.splice(rentals.indexOf(rentalInDb), 1);
  return rentalInDb;
}
