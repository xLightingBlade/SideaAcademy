import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'my-progress-bar',
  templateUrl: 'progress-bar-wrapper.html',
})
export class SharedIonProgressBar implements OnInit, OnChanges {
  @Input() barValue: number = 0;
  barColor: string = '';
  constructor() {}
  ngOnInit(): void {
    this.barValue/= 10;
    this.setBarColor(this.barValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.setBarColor(this.barValue);
  }

  setBarColor(value: number) {
    if (value < 0.5) {
      this.barColor = 'danger';
    } else if (value >= 0.5 && value < 0.8) {
      this.barColor = 'warning';
    } else {
      this.barColor = 'primary';
    }
  }
}
