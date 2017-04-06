import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../model/post';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PostService]
})
export class AdminComponent implements OnInit {
  title = 'Blog Admin';

  posts: Post[] = [];

  constructor(public router: Router, private postService: PostService) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => {
        this.posts = res;
    }, err => {
      console.log(err)
    })
  }

  addBlogPost(title, content, tags) {
    this.postService.addBlogPost(title, content, tags).subscribe(() => {
      this.getAllPosts();
    })
  }
}
