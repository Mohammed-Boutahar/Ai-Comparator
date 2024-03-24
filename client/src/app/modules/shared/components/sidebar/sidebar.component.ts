import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  faPlus = faPlus;
  conversationList: String[] = [
  ];

  isHovered = false;

  toggleSidebar() {
    // Toggle the visibility of the sidebar
    // You can use a service or an @Output to communicate with the parent component
    console.log('Toggle Sidebar');
  }

  // Methods to handle hover events
  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
