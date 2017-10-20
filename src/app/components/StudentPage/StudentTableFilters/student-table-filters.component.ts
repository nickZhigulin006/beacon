import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-student-table-filters',
    templateUrl: './student-table-filters.component.html',
    styleUrls: ['./student-table-filters.css']
})
export class StudentTableFiltersComponent implements OnInit {
    _location: object[] = [
        {
            'location': 'Select location',
            'shortCode': '<empty>'
        },
        {
            'location': 'EB',
            'shortCode': 'EB'
        },
        {
            'location': 'MB',
            'shortCode': 'MB'
        },
        {
            'location': 'NB',
            'shortCode': 'NB'
        },
        {
            'location': 'SPL',
            'shortCode': 'SPL'
        }
    ]
    _teacher: object[] = [
        {
            'type': 'Select teacher',
        },
        {
            'type': 'Enrichment'
        },
        {
            'type': 'Remedial'
        }
    ]
    _grade: object[] = [
        {
            'grade': 'Select grade',
            'shortCode': '<empty>'
        },
        {
            'grade': 'Pre-K',
            'shortCode': 'Pre-K'
        },
        {
            'grade': 'K',
            'shortCode': 'K'
        },
        {
            'grade': '1',
            'shortCode': '1'
        },
        {
            'grade': '2',
            'shortCode': '2'
        },
        {
            'grade': '3',
            'shortCode': '3'
        },
        {
            'grade': '4',
            'shortCode': '4'
        },
        {
            'grade': '5',
            'shortCode': '5'
        },
        {
            'grade': '6',
            'shortCode': '6'
        },
        {
            'grade': '7',
            'shortCode': '7'
        }]
    _subject: object[] = [
        {
            'type': 'Select subject',
        },
        {
            'type': 'Online'
        },
        {
            'type': 'Referral'
        },
        {
            'type': 'Walk in'
        },
        {
            'type': 'Direct Mail'
        },
        {
            'type': 'Yard Sign'
        }]
    _program: object[] = [
        {
            'grade': 'Select program',
            'shortCode': '<empty>'
        },
        {
            'name': 'Math',
            'shortCode': 'Math'
        },
        {
            'name': 'Reading',
            'shortCode': 'Reading'
        }]
    _weekday: object[] = [
        {
            'name': 'Select weekday',
        },
        {
            'name': 'Mon'
        },
        {
            'name': 'Tue'
        },
        {
            'name': 'Wed'
        },
        {
            'name': 'Thu'
        },
        {
            'name': 'Fri'
        },
        {
            'name': 'Sat'
        },
        {
            'name': 'Sun'
        }]

    defaultFilters = {
        location: '<empty>',
        teacher: 'Select teacher',
        grade: '<empty>',
        subject: 'Select subject',
        program: 'Select program',
        weekday: 'Select weekday',

    }
    filters = {
        location: '<empty>',
        teacher: 'Select teacher',
        grade: '<empty>',
        subject: 'Select subject',
        program: 'Select program',
        weekday: 'Select weekday',

    }

    constructor(private router: Router, private route: ActivatedRoute,) {
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                if (!params) return
                Object.assign(this.filters, params);
            })
    }


    clearAll() {
        this.filters = {
            location: '<empty>',
            teacher: 'Select teacher',
            grade: '<empty>',
            subject: 'Select subject',
            program: 'Select program',
            weekday: 'Select weekday',

        },
            this.router.navigate(['/students']);

    }

    selectOptions(name, type) {
        if (type == this.defaultFilters[name]) {
            return this.router.navigate(['/students'], {
                queryParams: {[name]: undefined}
            });
        }

        this.router.navigate(['/students'], {queryParams: {[name]: type}});

    }

}
