import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { TextInputComponent } from '../shared/components/text-input/text-input.component';
import { TextConversationComponent } from '../shared/components/text-conversation/text-conversation.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, TextInputComponent, TextConversationComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  @Input() conversationList:string[] = []

  addToUserConversation(text:string){
    if(text !== ''){
      this.conversationList.push(`User : ${text}`);
      console.log(this.conversationList)
    }
  }

  addToSystemConversation(text:string){
    if(text !== ''){
      this.conversationList.push(`ChatGPT : ${text}`);
      console.log(this.conversationList)
    }
  }

}
