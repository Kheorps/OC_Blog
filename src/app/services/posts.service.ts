import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { Subject } from 'rxjs';
import { database } from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[];                          // Liste des posts
  postsSubject = new Subject<Post[]>();   // Subject des posts

  /**
   * Constructeur
   */
  constructor() {
    this.getPosts();
  }

  /**
   * Fonction d'émission du Subject
   */
  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  /**
   * Fonction de sauvegarde des posts sur le backend
   */
  savePosts() {
    database().ref('/posts').set(this.posts);
  }

  /**
   * Fonction de récupération des posts du backend
   */
  getPosts() {
    database().ref('/posts').on(
      'value', (data: DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      }
    );
  }

  /**
   * Fonction de création d'un nouveau post
   * @param newPost Post créé en amont
   */
  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  /**
   * Fonction de suppression d'un post
   * @param post Post à supprimer
   */
  removePost(indexPost: number) {
    this.posts.splice(indexPost, 1);
    this.savePosts();
    this.emitPosts();
  }

  likePost(indexPost: number) {
    this.posts[indexPost].loveIts++;
    this.savePosts();
    this.emitPosts();
  }

  dislikePost(indexPost: number) {
    this.posts[indexPost].loveIts--;
    this.savePosts();
    this.emitPosts();
  }
}
