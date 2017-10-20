import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  result: any;

  constructor(private _http: Http) {

  }

  getStudents() {
    return this._http.get('/api/student')
        .map(result => this.result = result.json());
  }

  createStudent(student) {
    return this._http.post('/api/student', {data: student})
        .map(result => this.result = result);
  }

}
