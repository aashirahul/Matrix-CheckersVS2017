import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPopUpModalComponent } from './album-pop-up-modal.component';

describe('AlbumPopUpModalComponent', () => {
  let component: AlbumPopUpModalComponent;
  let fixture: ComponentFixture<AlbumPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
