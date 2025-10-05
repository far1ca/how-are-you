import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class EmotionService {
  private apiUrl = 'https://virtual-shelf.far1ca.hackclub.app'; // backend URL

  async fetchAccuracy(): Promise<any> {
    const res = await axios.get(this.apiUrl + '/accuracy');
    return res.data;
  }

  async sendFeedback(correct: boolean): Promise<any> {
    const res = await axios.post(this.apiUrl + '/feedback', { correct });
    return res.data;
  }

  async analyze(text: string): Promise<any> {
    const res = await axios.post(this.apiUrl + '/analyze', { text });
    return res.data;
  }
}
