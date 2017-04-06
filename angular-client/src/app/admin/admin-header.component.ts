import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'admin-header',
    templateUrl: './admin-header.component.html',
    providers: [AuthService]
})
export class AdminHeaderComponent implements OnInit {
    constructor(public router: Router, private authService: AuthService) { }

    ngOnInit() {
    }

    logout() {
        localStorage.removeItem('id_token');
        this.router.navigate(['login']);
    }

}