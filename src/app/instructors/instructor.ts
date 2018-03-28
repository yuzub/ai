export interface IInstructor {
  instructorName: string;
  car: string;
  gearbox: string;
  price90min: number;
  cityarea: string;
  phone: string;
  starRating?: number;
  photoUrl?: string;
  carPhotoUrl?: string;
  email?: string;
  key?: string;
}

export class Instructor implements IInstructor {
  constructor(
    public instructorName: string = '',
    public car: string = '',
    public gearbox: string = '',
    public price90min: number = 200,
    public cityarea: string = '',
    public phone: string = '',
    public starRating: number = 0,
    public photoUrl: string,
    public carPhotoUrl: string,
    public email?: string,
    public key?: string
  ) {}

  price40hours(price: number) {
    return this.price90min * 20;
  }
}
