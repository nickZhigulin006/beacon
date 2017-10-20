import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentTableFiltersComponent} from './student-table-filters.component';

describe('LeftMenuComponent', () => {
    let component: StudentTableFiltersComponent;
    let fixture: ComponentFixture<StudentTableFiltersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StudentTableFiltersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentTableFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
