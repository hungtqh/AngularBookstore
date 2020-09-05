import { Customer } from './customer';

export class User {
  public id: number;
  public email: string;
  public phoneNumber: string;
  public password: string;
  public enabled: boolean;
  public customer: Customer;
}
