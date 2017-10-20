import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {StudentService} from './services/student.service';
import {HeaderComponent} from './components/Header/header.component';
import {StudentTableFiltersComponent} from './components/StudentPage/StudentTableFilters/student-table-filters.component';
import {StudentTableComponent} from './components/StudentPage/StudentTable/student-table.component';
import {StudentPageComponent} from './components/StudentPage/student-page.component';
import {AddStudentModalComponent} from './components/StudentPage/AddStudentModal/add-student-modal.component';
import {DataTablesModule} from 'angular-datatables';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        StudentTableFiltersComponent,
        StudentTableComponent,
        StudentPageComponent,
        AddStudentModalComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        DataTablesModule,
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [
        StudentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
