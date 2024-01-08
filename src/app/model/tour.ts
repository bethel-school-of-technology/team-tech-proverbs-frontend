export class Tour {
    name: string = "";
    slug: string = '';
    duration: number = 0;
    maxGroupSize: number = 0;
    difficulty: string = '';
    ratingsAverage: number = 0;
    ratingsQuantity: number = 0;
    price: number = 0;
    priceDiscount: number = 0;
    summary: string = "";
    description: string = "";
    imageCover: string = "";
    images: string[] = [];
    createdAt: Date = new Date();
    startDates: Date[] = [new Date];
    secretTour: boolean = false;
    startLocation: {
      type: string;
      coordinates: number[];
      address: string;
      description: string;
    };
    locations: {
      type: string;
      coordinates: number[];
      address: string;
      description: string;
      day: number;
    }[] = [];
    guides: string[] = []; 
  
    durationWeeks: number = 0;

    reviews: any[] = []; 
  
    constructor(data?: Partial<Tour>) {
        this.startLocation = {
          type: '',
          coordinates: [],
          address: '',
          description: '',
        };
        this.locations = [];
        Object.assign(this, data);
      }
  }
