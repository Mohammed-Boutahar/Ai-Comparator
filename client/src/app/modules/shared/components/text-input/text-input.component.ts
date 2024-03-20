import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
  faCircleUp = faCircleUp;

  @Output() onSendButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() onChatGPTRespond: EventEmitter<string> =
    new EventEmitter<string>();

  promptText: string = '';
  onSendButton() {
    this.onSendButtonClicked.emit(this.promptText);
    fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: this.promptText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.onChatGPTRespond.emit(data.response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.promptText = '';
    // console.log(this.promptText);
  }
}
