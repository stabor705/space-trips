import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'agh-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  featuredDestinations = [
    { name: 'Destination 1', image: 'assets/stock-photo-beautiful-beach-on-hong-island-krabi-thailand-landmark-destination-southeast-asia-travel-2190416887.jpg' },
    { name: 'Destination 2', image: 'assets/stock-photo-summer-travel-vacation-concept-happy-traveler-asian-woman-relax-and-sightseeing-on-beach-in-2147728737.jpg' },
    { name: 'Destination 3', image: 'assets/stock-photo-summer-travel-vacation-concept-happy-traveler-asian-woman-with-dress-relax-and-sightseeing-on-1951840408.jpg'},
    { name: 'Destination 4', image: 'assets/stock-photo-beautiful-beach-on-hong-island-krabi-thailand-landmark-destination-southeast-asia-travel-2190416887.jpg' },
    { name: 'Destination 5', image: 'assets/stock-photo-summer-travel-vacation-concept-happy-traveler-asian-woman-with-hat-relax-in-hammock-on-beach-in-2306404091.jpg' },
    { name: 'Destination 6', image: 'assets/stock-photo-summer-travel-vacation-concept-happy-traveler-asian-woman-with-hat-relax-in-hammock-on-beach-in-1906694002.jpg'},

  ];
}
