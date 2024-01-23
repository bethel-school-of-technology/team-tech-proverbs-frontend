import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  tour: Tour = new Tour();

  constructor( private route: ActivatedRoute, private tourService: TourService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      // Use 'slug' to fetch tour details
      this.tourService.getTourBySlug(slug).subscribe(response => {
        this.tour = response;
      });
    });
  }
  

}
