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
  confidence: number = 100;
  inputDisabled: boolean = true;
  showResult: boolean = false;
  emotion: string = 'happy';
  emoji = '😄';
  emotionColor: string = '#f7c707';
  isAnalyzing: boolean = false;
  accuracyRate: number = 100;
  result: any;

  constructor(private emotionService: EmotionService) {}

  ngOnInit(): void {
    this.emotionService.fetchAccuracy().then((data) => {
      this.accuracyRate = data.accuracy;
    });

    setTimeout(() => {
      this.inputDisabled = false;
    }, 5000);
  }

  sendFeedback(feedback: boolean): void {
    this.emotionService.sendFeedback(feedback);
    // window.location.reload();
  }

  async analyze() {
    this.isAnalyzing = true;
    this.result = await this.emotionService.analyze(this.text);
    if (this.result) {
      this.isAnalyzing = false;
      this.confidence = Math.round(this.result[0][0].score * 100);
      switch (this.result[0][0].label) {
        case 'joy':
          this.emotion = 'happy';
          this.emotionColor = '#f7c707';
          this.emoji = '😄';
          break;
        case 'sadness':
          this.emotion = 'sad';
          this.emotionColor = '#707cf7';
          this.emoji = '😢';
          break;
        case 'anger':
          this.emotion = 'angry';
          this.emotionColor = '#f74e07';
          this.emoji = '😠';
          break;
        case 'fear':
          this.emotion = 'scared';
          this.emotionColor = '#000000';
          this.emoji = '😱';
          break;
        case 'surprise':
          this.emotion = 'surprised';
          this.emotionColor = '#07f7d1';
          this.emoji = '😲';
          break;
        case 'disgust':
          this.emotion = 'disgusted';
          this.emotionColor = '#408026';
          this.emoji = '🤢';
          break;
        default:
          this.emotion = 'neutral';
          this.emotionColor = '#707070';
          this.emoji = '😐';
      }
      this.showResult = true;
    }
  }
}
