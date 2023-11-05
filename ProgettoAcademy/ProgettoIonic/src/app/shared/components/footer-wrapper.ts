import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonList } from '../interfaces/common-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'my-footer',
  templateUrl: 'footer-wrapper.html',
  styleUrls: ['footer-wrapper.scss'],
})
export class FooterWrapper implements OnInit {
  constructor(private _breakpointObs: BreakpointObserver) {}

  ngOnInit(): void {
    this._breakpointObs
      .observe(this.breakpointsToObserve)
      .subscribe((currentBreakpoint) => {
        this.isInPortraitMode = false;
        if (currentBreakpoint.matches) {
          this.isInPortraitMode = true;
        }
      });
  }

  @Input() footerContent: CommonList | undefined;
  @Output() clickedMovie = new EventEmitter<string>();
  isInPortraitMode = false;
  breakpointsToObserve = [
    Breakpoints.HandsetPortrait,
    Breakpoints.TabletPortrait,
  ];

  emitMovieId(id: string) {
    this.clickedMovie.emit(id);
  }
}
