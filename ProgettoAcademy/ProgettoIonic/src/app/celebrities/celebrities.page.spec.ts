import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CelebritiesPage } from './celebrities.page';

describe('CelebritiesPage', () => {
  let component: CelebritiesPage;
  let fixture: ComponentFixture<CelebritiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CelebritiesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CelebritiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
