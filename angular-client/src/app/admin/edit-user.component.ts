import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

@Component({
    selector: 'edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css'],
    providers: [AuthService]
})
export class EditUserComponent implements OnInit {
    title = 'Edit User';

    id: string;
    user: User;

    constructor(private route: ActivatedRoute, public router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.getUser();
    }

    getUser() {
        this.authService.getUser(this.id).subscribe(res => {
            this.user = res;
        }, err => {
            console.log(err)
        });
    }

    saveUser(id, name, password, admin) {
        this.authService.saveUser(id, name, password, admin).subscribe(() => {
            this.getUser();
        })
    }
}