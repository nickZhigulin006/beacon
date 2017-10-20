import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StudentPageComponent} from './components/StudentPage/student-page.component';

const routes: Routes = [
    {path: '', redirectTo: '/students', pathMatch: 'full'},
    {path: 'students', component: StudentPageComponent},
    { path: '**', redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
