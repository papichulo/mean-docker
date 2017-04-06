import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService]
})
export class LoginComponent {

    errorMessage: string;
    
    constructor(public router: Router, private authService: AuthService) { }

    login(username, password) {
        this.authService.authenticate(username, password)
            .subscribe(res => {
                if (res.success)
                {
                    localStorage.setItem('id_token', res.token);
                    localStorage.setItem('user', res.user);
                    this.router.navigate(['admin']);
                }
                else
                {
                    console.log('auth 1', res.message);
                    this.errorMessage = res.message;
                }
            }, err => {
                console.log('auth 2', err);
            });
    }
}