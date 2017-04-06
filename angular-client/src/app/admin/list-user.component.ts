import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

@Component({
    selector: 'users',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css'],
    providers: [AuthService]
})
export class ListUserComponent implements OnInit {
    title = 'List Users';

    users: User[] = [];

    constructor(public router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.getAllUsers();    
    }

    getAllUsers() {
        this.authService.getAllUsers().subscribe(res => {
            this.users = res;
        }, err => {
            console.log(err);
        });
    }

    deleteUser(id) {
        console.log('Deleting user: ', id);
        if (id==undefined)
            return;
        this.authService.deleteUser(id).subscribe(() => {
            this.getAllUsers();
        })
    }
}