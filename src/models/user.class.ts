export class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number | null;
  street: string;
  zipCode: number | null;
  city: string;

  constructor(obj?: any) {
    this.id = obj?.id;
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : null;
    this.street = obj ? obj.street : '';
    this.zipCode =
      obj &&
      obj.zipCode !== undefined &&
      obj.zipCode !== null &&
      obj.zipCode !== ''
        ? Number(obj.zipCode)
        : null;
    this.city = obj ? obj.city : '';
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    };
  }
}
