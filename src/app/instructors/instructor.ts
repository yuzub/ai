export interface IInstructor {
  instructorName: string;
  photoUrl: string;
  car: string;
  photoCarUrl: string;
  gearbox: string;
  price90min: number;
  cityarea: string;
  phone: string;
  starRating: number;
  email?: string;
  key?: string;
}

export class Instructor implements IInstructor {
  constructor(
    public instructorName: string = '',
    public photoUrl: string = '',
    public car: string = '',
    public photoCarUrl: string = '',
    public gearbox: string = '',
    public price90min: number = 200,
    public cityarea: string = '',
    public phone: string = '',
    public starRating: number = 0,
    public email?: string,
    public key?: string
  ) {}

}
