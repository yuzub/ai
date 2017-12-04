import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'ai-star',
  templateUrl: 'star.component.html',
  styleUrls: ['star.component.css']
})
export class StarComponent implements OnChanges{
  @Input() rating: number;
  maxWidth: number = 88;
  starWidth: number;

  ngOnChanges() {
    this.starWidth = this.rating * this.maxWidth/5;
  }
}
