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
  ownBookings: Booking[] | undefined;
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
  property: string | Apartment;
  user: string | User;
  paidFor: boolean;
  amount: number;
}

export interface Apartment {
  name: string;
  codeID: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  amenities: amenitiesList;
  isCleaned: boolean;
  id: string;
  pictures: { buffer: string; name: string; mimetype: string }[];
  bookings: Booking[];
  description: string;
}

export enum checkTimes {
  checkIn = 15,
  checkOut = 12,
}

export interface amenitiesList {
  balcony: boolean;
  bathtub: boolean;
  shower: boolean;
  wifi: boolean;
  tv: boolean;
  cutlery: boolean;
  microwave: boolean;
  oven: boolean;
  kettle: boolean;
  cooker: boolean;
  fridge: boolean;
  washingMachine: boolean;
  iron: boolean;
  ironingBoard: boolean;
  linen: boolean;
  towels: boolean;
}
