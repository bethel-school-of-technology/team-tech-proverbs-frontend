import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/services/tour.service';

declare const mapboxgl: any;

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
})
export class TourDetailsComponent implements OnInit, AfterViewInit {
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
    });
    
    this.tourLocations = JSON.stringify(this.tour.locations);
    console.log('Tour Locations: ', this.tourLocations);
  }

  ngAfterViewInit(): void {
    const locations = this.tour.locations;

    if (!locations || locations.length === 0) {
      console.error('No locations available.');
      return;
    }

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ishkev32/clpvaci5z01gp01p9f0f4cik8',
      scrollZoom: false,
    });

    map.on('load', () => {
      const bounds = new mapboxgl.LngLatBounds();

      locations.forEach((loc) => {
        const el = document.createElement('div');
        el.className = 'marker';

        if (!Array.isArray(loc.coordinates) || loc.coordinates.length !== 2) {
          console.error('Invalid coordinates:', loc.coordinates);
          return; // Skip this location
        }

        new mapboxgl.Marker({
          element: el,
          anchor: 'bottom',
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
    });
  }
}
