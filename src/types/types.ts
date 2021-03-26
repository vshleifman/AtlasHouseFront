export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telNum: string;
  country: string;
}

export interface Apartment {
  name: string;
  codeID: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  isCleaned: boolean;
  id: string;
  pictures: any[];
  bookings: {
    checkIn: string;
    checkOut: string;
    createdAt: string;
    updatedAt: string;
    property: string;
    user: string;
    paidFor: boolean;
  }[];
}
