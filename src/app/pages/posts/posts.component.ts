import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './posts.component.html',
})
export class PostsComponent {

}
