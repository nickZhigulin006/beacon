import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  bodyColumns: object[] = [];
  constructor(private http: StudentService) {}
  dtOptions: DataTables.Settings = {};
  openModal = false;
  ngOnInit() {
    this.getData();
    this.dtOptions = {
      ordering: false,
      searching: false,
      lengthChange: false,
      data: this.bodyColumns,
      columns: [
        {
          data: 'fullName',
          title: 'Name',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '150'
        },
        {
          data: 'grade',
          title: 'Grade',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '50'
        },
        {
          data: 'location',
          title: 'Location',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '100'
        },
        {
          data: 'parentName1',
          title: 'Parent1 Full name',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '100'
        },
        {
          data: 'parent_email_1',
          title: 'Parent1 Email',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '100'
        },
        {
          data: 'parent_cell_no_1',
          title: 'Parent1 Cell no.',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '100'
        },
        {
          data: 'parentName2',
          title: 'Parent2 Full name',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '100'
        },
        {
          data: 'parent_email_2',
          title: 'Parent2 Email',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '100'
        },
        {
          data: 'parent_cell_no_2',
          title: 'Parent2 Cell no.',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '100'
        },
        {
          data: 'create_date',
          type: 'date',
          title: 'Created date',
          className: 'table__cell',
          defaultContent: '<i>Not set</i>',
          width: '100'
        }
      ]
    };
  }
  openModalWindow() {
    this.openModal = true;
  }
  getData() {
    this.bodyColumns = [];
    this.http
        .getStudents()
        .subscribe(
            (val) => {
              console.log('POST call successful value returned in body',
                  val);
              this.bodyColumns.splice(0);
              val.forEach( item => {
                item = this.parseData(item);
              });
              this.bodyColumns.push(...val);
            },
            response => {
              console.log('POST call in error', response);
            },
            () => {
              console.log('The POST observable is now completed.');
            });
  }
  parseData(item) {
    item.create_date = new Date(+item.create_date).toISOString().split('T')[0];
    item.location = item.Location ? item.Location.city : '-';
    item.grade = item.Grade ? item.Grade.grade_name : '-';
    const fem1 = item.Families[0], fem2 = item.Families[1];
    item.parentName1 = fem1 ? fem1.Parent.fullName : '-';
    item.parent_email_1 = fem1 ? fem1.Parent.email : '-';
    item.parent_cell_no_1 = fem1 ? fem1.Parent.cell_phone : '-';
    item.parentName2 = fem2 ? fem2.Parent.fullName : '-';
    item.parent_email_2 = fem2 ? fem2.Parent.email : '-';
    item.parent_cell_no_2 = fem2 ? fem2.Parent.cell_phone : '-';
    return item;
  }

}
