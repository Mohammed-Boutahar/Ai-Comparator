import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-conversation',
  standalone: true,
  imports: [],
  templateUrl: './text-conversation.component.html',
  styleUrl: './text-conversation.component.scss'
})
export class TextConversationComponent {
  @Input() conversation: string[] = [];


  addToConversation(text:string):void {
    this.conversation.push(text);
  }

}
