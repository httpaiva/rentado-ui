import { Rent } from "./Rent";

export type Payment = {
  id?: string;
  paymentDate: Date;
  referedMonth: number;
  referedYear: number;
  value: number;
  rent?: Rent;
};
