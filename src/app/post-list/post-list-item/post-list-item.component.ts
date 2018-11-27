import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../model/post';
import { PostsService } from '../../services/posts.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  isAuth: boolean;

  @Input() index: number;
  @Input() post: Post;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    auth().onAuthStateChanged(
      (user) => {
        this.isAuth = (user) ? true : false;
      }
    );
  }

  getColor() {
    return (this.post.loveIts > 0) ? 'darkgreen' : (this.post.loveIts < 0) ? 'darkred' : 'black';
  }

  onLoveIt(post: Post) {
    this.postsService.likePost(this.index);
  }

  onDislikeIt(post: Post) {
    this.postsService.dislikePost(this.index);
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(this.index);
  }
}
