import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css']
})
export class AddStudentModalComponent implements OnInit {
  @Input() openModal: boolean;
  constructor(private http: StudentService) { }
  errorArr: any = [];
  student: any = {grade_id: false};
  modalTabs: any = {
    current: 'student'
  };
  ngOnInit() {
    Observable.fromEvent(document, 'keyup')
        .subscribe((x: any) => {
          if (x.key === 'Escape') {
            this.openModal = false;
          }
          return x;
        });
  }

  send() {
    this.errorArr = [];
    const regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const requireFields = [
      'first_name', 'last_name', 'grade_id', 'date_of_birth', 'street1', 'zip', 'city', 'state', 'heard_from', 'enrichment_id',
      'first_name1', 'last_name1', 'parent_email_1', 'parent_cell_no_1',
      'first_name2', 'last_name2', 'parent_email_2', 'parent_cell_no_2'];
    this.errorArr = requireFields.filter((item) => {
      if (['parent_email_1', 'parent_cell_no_1', 'parent_email_2', 'parent_cell_no_2'].indexOf(item) > -1 && !!this.student[item]) {
        if (['parent_email_1', 'parent_email_2'].indexOf(item) > -1) {
          return !regExpEmail.test(this.student[item]);
        } else {
          return !this.parseCellNo(this.student[item]);
        }
      } else {
        return !this.student[item];
      }
    });
    if (!this.errorArr.length) {
      this.http
          .createStudent(this.student)
          .subscribe(() => {
            this.openModal = false;
            this.student = {};
            location.reload();
          });
    }
  }

  parseCellNo(cell) {
    const regExpCell = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/gm
    return regExpCell.test(cell.split('(').join('').split(')').join('').split('-').join(''));
  }
  haveError(name) {
    return this.errorArr.indexOf(name) !== -1;
  }
  focusError(name): any {
    if (this.errorArr.indexOf(name) > -1) {
      this.errorArr.splice(this.errorArr.indexOf(name), 1);
    }
  }
  openTab(name) {
    this.modalTabs.current = name;
  }
}
