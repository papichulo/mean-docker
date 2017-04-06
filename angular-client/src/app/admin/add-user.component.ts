import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
    providers: [AuthService]
})
export class AddUserComponent implements OnInit {
    title = 'Add User';

    user: User;

    constructor(public router: Router, private authService: AuthService) { }

    ngOnInit() {
    }

    addUser(name, password, admin) {
        this.authService.addUser(name, password, admin).subscribe(() => {

        })
    }
}