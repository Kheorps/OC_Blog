import { Component } from '@angular/core';
import { Post } from './model/post';
import { initializeApp } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyBsNLVHoyFaSqaGu6I2sTlnVLPpdyURmDM',
      authDomain: 'oc-blog.firebaseapp.com',
      databaseURL: 'https://oc-blog.firebaseio.com',
      projectId: 'oc-blog',
      storageBucket: 'oc-blog.appspot.com',
      messagingSenderId: '749711320313'
    };
    initializeApp(config);
  }
}
