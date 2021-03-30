import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicviewComponent } from './comicview.component';

describe('ComicviewComponent', () => {
  let component: ComicviewComponent;
  let fixture: ComponentFixture<ComicviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
