import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  
  mypostId:number = this.route.snapshot.params.id;

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
  }

}
