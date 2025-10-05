import { Component, OnInit } from '@angular/core';
import { EmotionService } from './emotion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  text: string = '';
  inputDisabled: boolean = true;
  result: any;

  constructor(private emotionService: EmotionService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.inputDisabled = false;
    }, 5000);
  }

  async analyze() {
    this.result = await this.emotionService.analyze(this.text);
  }
}
