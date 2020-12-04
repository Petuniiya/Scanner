import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealSearchComponent } from './seal-search.component';

describe('SealSearchComponent', () => {
  let component: SealSearchComponent;
  let fixture: ComponentFixture<SealSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SealSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SealSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
