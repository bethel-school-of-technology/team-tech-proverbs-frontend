import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/services/tour.service';

// Declare mapboxgl as a global variable
declare const mapboxgl: any;

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
})
export class TourDetailsComponent implements OnInit {
  tour: Tour = new Tour();
  tourLocations: string = '';

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.tourService.getTourById(id).subscribe((response) => {
      this.tour = response;
      this.tourLocations = JSON.stringify(this.tour.locations);
      console.log(this.tour.locations);
      // Call map setup logic only after fetching tour data
      this.setupMap();
    });
  }

  setupMap(): void {
    const locations = this.tour.locations;

    if (!locations || locations.length === 0) {
      console.error('No locations available.');
      return;
    }

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
        color: '#55c57a'
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
}
