import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/services/tour.service';
import { BookingService } from 'src/app/services/booking.service';

import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

// Declare mapboxgl as a global variable
declare const mapboxgl: any;
declare const Stripe: any;

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
})
export class TourDetailsComponent implements OnInit {
  tour: Tour = new Tour();
  tourLocations: string = '';
  isLoggedIn: boolean = false;
  token: any;

  isloggedIn: boolean = false;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private userService: UserService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.tourService.getTourById(id).subscribe((response) => {
      this.tour = response;
      this.tourLocations = JSON.stringify(this.tour.locations);
      // Call map setup logic only after fetching tour data
      this.setupMap();
    });
    if (this.userService.isloggedIn) {
      this.isLoggedIn = true;
    }
    //chris
    this.userService.isloggedIn.subscribe((loggedIn) => {
      this.isloggedIn = loggedIn;
      if (loggedIn) {
        const jwtString = localStorage.getItem('jwt');
        if (jwtString !== null) {
          const response = JSON.parse(jwtString);
          this.currentUser = response.data.user;
          this.token = response.token;
        } else {
          this.currentUser;
        }
      }
    });
  }

  setupMap(): void {
    const locations = this.tour.locations;

    mapboxgl.accessToken =
      'pk.eyJ1IjoiaXNoa2V2MzIiLCJhIjoiY2xwdjcyZDEyMDI4dDJqbnVuZ3ZkODNyeSJ9.CYB_n3qPz5IJbRts7jNkdQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ishkev32/clrz81e1u005u01pa45re0s3u',
      scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      new mapboxgl.Marker({
        color: '#55c57a',
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      new mapboxgl.Popup({
        offset: 30,
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  }

  processPayment(): void {
    const tourId = this.route.snapshot.params['id'];
    if (this.token) {
      this.bookingService.createCheckoutSession(tourId, this.token).subscribe(
        (session) => {
          // Initialize Stripe with your public key
          const stripe = Stripe(environment.stripePublicKey);

          // Redirect to Stripe checkout page
          stripe
            .redirectToCheckout({
              sessionId: session.session.id,
            })
            .then(function (result: { error: { message: any } }) {
              if (result.error) {
                // Handle any errors that occur during redirection
                console.error(result.error.message);
              }
            });
        },
        (error) => {
          console.error('Error creating checkout session:', error);
        }
      );
    }
  }
}
