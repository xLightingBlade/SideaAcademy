import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmittedObject } from '../../shared/interfaces/emitted-object-interface';
import { CommonList } from 'src/app/shared/interfaces/common-list';
import { Actions } from 'src/app/shared/interfaces/actions-enum';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'movies-content',
  templateUrl: 'movies-page-content.html',
  styleUrls: ['movies-page-content.scss'],
})
export class MoviesPageContent implements OnInit {
  pageTitle = 'Movies';
  titleSearchForm!: FormGroup;
  isInPortraitMode = false;
  breakpointsToObserve = [
    Breakpoints.HandsetPortrait,
    Breakpoints.TabletPortrait,
  ];
  footerMovie$ = new BehaviorSubject("");
  footerContent:CommonList | undefined;

  @Input() movieList: CommonList[] = [];

  @Output() clickedMovie = new EventEmitter<EmittedObject>();
  @Output() movieRatingSliderValue = new EventEmitter<RangeValue>();
  @Output() movieTitleValue = new EventEmitter<string>();

  constructor(private _breakpointObs: BreakpointObserver) {
    this.setSearchForm();
    this.footerMovie$.subscribe(movieId => this.updateFooter(movieId))
  }
  ngOnInit(): void {
    this._breakpointObs.observe(this.breakpointsToObserve).subscribe((currentBreakpoint) => {
        this.isInPortraitMode = false
        if(currentBreakpoint.matches) {
            this.isInPortraitMode = true;
        }
    })
  }

  updateFooter(id:string) {
    this.footerContent = this.movieList.find(movie => movie.id == id);
  }

  setSearchForm() {
    this.titleSearchForm = new FormGroup({
      title: new FormControl(),
    });
    //this.titleSearchForm.get('title')?.valueChanges.pipe(debounceTime(500)).subscribe((title)=> this.movieTitleValue.emit(title));
    //sostituito da chiamata direttamente in movie page facendo uso di viewchild
  }

  pinFormatter(value: number) {
    return value / 10;
  }

  clicked(name: string) {
    console.log(name + 'clicked');
  }

  emitMovieIdForFooterDisplay(id: string) {
    this.footerMovie$.next(id);
  }

  emitMovieIdForDetail(id:string) {
    this.clickedMovie.emit({id, actionSelected:Actions.Detail})
  }

  emitMovieIdForEdit(id: string) {
    this.clickedMovie.emit({ id, actionSelected: Actions.Edit });
  }

  emitMovieIdForDelete(id: string) {
    this.clickedMovie.emit({ id, actionSelected: Actions.Delete });
  }

  emitEventForCreation() {
    this.clickedMovie.emit({ id: '', actionSelected: Actions.Create });
  }

  movieRatingSliderChange(e: Event) {
    console.log((e as RangeCustomEvent).detail.value);
    this.movieRatingSliderValue.emit((e as RangeCustomEvent).detail.value);
  }
}
