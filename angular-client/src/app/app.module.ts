import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './admin/auth.guard';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header.component';
import { ListUserComponent } from './admin/list-user.component';
import { AddUserComponent } from './admin/add-user.component';
import { EditUserComponent } from './admin/edit-user.component';
import { LoginComponent } from './admin/login.component';
import { BlogComponent } from './blog/blog.component';
import { BlogHeaderComponent } from './blog/blog-header.component';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/users',
        component: ListUserComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/user',
        component: AddUserComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin/user/:id',
        component: EditUserComponent, canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: BlogComponent
    }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AdminHeaderComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    BlogComponent,
    BlogHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
      AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
