import { User } from "./User.";

export type Location = {
  id?: string;
  name: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  postalCode: string;
  complement?: string;
  user?: User;
};
