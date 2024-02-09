export class Booking {
    _id: string = "";
    tour: string = "";
    user: string = "";
    price: number = 0;
    createdAt: Date = new Date();
    paid: boolean = false;
  
    constructor(data?: Partial<Booking>) {
      Object.assign(this, data);
    }
  }
  