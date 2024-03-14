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
    'Conversation 1',
    'Conversation 2',
    'Conversation 3',
    'Conversation 4',
    'Conversation 5',
    'Conversation 6',
    'Conversation 7',
    'Conversation 8',
    'Conversation 9',
    'Conversation 10',

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
