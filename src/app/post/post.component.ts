import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }
  posts:any[] = [
    {
      id:1,
      title: 'Trumps First Sitting President To North Korea',
      content: 'Trump is the first ever president of the US to land in North Korea'
    },
    {
      id:2,
      title: 'Presidential Couple Obama In France for Daugther\'s Birthday',
      content: 'Presiential Couple Obama together with their two daugthers booked a whole mannoire in Paris to celebrate Shsha\'s birthday'
    },
    {
      id:3,
      title: 'LeBron James Son Official Instagram Account',
      content: 'LeBron Raymond James popularly known as Bronny is the super star NBA Champion\'s son (LeBron James), He is equally very gifted in the game '
    }
  ];
  ngOnInit() {
  }

}
