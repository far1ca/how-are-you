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
  showResult: boolean = false;
  emotion: string = '';
  isAnalyzing: boolean = false;
  result: any;

  constructor(private emotionService: EmotionService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.inputDisabled = false;
    }, 5000);
  }

  async analyze() {
    this.isAnalyzing = true;
    this.result = await this.emotionService.analyze(this.text);
    if (this.result) {
      console.log(this.result);
      this.isAnalyzing = false;
      switch (this.result[0][0].label) {
        case 'joy':
          this.emotion = 'happy';
          break;
        case 'sadness':
          this.emotion = 'sad';
          break;
        case 'anger':
          this.emotion = 'angry';
          break;
        case 'fear':
          this.emotion = 'scared';
          break;
        case 'surprise':
          this.emotion = 'surprised';
          break;
        case 'disgust':
          this.emotion = 'disgusted';
          break;
        default:
          this.emotion = 'neutral';
      }
      this.showResult = true;
    }
  }
}
