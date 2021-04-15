export interface InitialUserState {
  userData: User;
  errorMsg: string;
}

export interface InitialPropertyState {
  properties: Apartment[] | undefined;
  errorMsg: string | undefined;
  filters?: {
    balcony: boolean;
  };
}

export interface InitialAuthState {
  token: string | undefined;
  errorMsg: string | undefined;
}

export interface InitialBookingState {
  bookings: Booking[] | undefined;
  errorMsg: string | undefined;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telNum: string;
  country: string;
  role: number;
}

export interface Booking {
  checkIn: string;
  checkOut: string;
  createdAt: string;
  updatedAt: string;
  property: string;
  user: string;
  paidFor: boolean;
}

export interface Apartment {
  name: string;
  codeID: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  isCleaned: boolean;
  id: string;
  pictures: string[];
  bookings: Booking[];
}
