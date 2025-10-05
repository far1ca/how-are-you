import { Component } from '@angular/core';
import { EmotionService } from './emotion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  text: string = '';
  result: any;

  constructor(private emotionService: EmotionService) {}

  async analyze() {
    this.result = await this.emotionService.analyze(this.text);
  }
}
