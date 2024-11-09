import { Location } from "./Location";
import { Renter } from "./Renter";

export type Rent = {
  id?: string;
  initialDate: Date;
  endDate: Date;
  price: number;
  paymentDate: Date;
  renter?: Renter;
  location?: Location;
};
