import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllToursComponent } from './get-all-tours.component';

describe('GetAllToursComponent', () => {
  let component: GetAllToursComponent;
  let fixture: ComponentFixture<GetAllToursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllToursComponent]
    });
    fixture = TestBed.createComponent(GetAllToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
