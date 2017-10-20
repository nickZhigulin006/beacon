import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentModalComponent } from './add-student-modal.component';

describe('AddStudentModalComponent', () => {
  let component: AddStudentModalComponent;
  let fixture: ComponentFixture<AddStudentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
