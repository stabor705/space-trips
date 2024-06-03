import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'agh-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  featuredDestinations = [
    { name: 'Destination 1', image: 'assets/image1.png' },
    { name: 'Destination 2', image: 'assets/image2.jpeg' },
    { name: 'Destination 3', image: 'assets/image3.jpeg'},
    { name: 'Destination 4', image: 'assets/image4.jpeg' },
    { name: 'Destination 5', image: 'assets/image5.jpeg' },


  ];
}
