import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class EmotionService {
  private apiUrl = 'http://localhost:3000/analyze'; // backend URL

  async analyze(text: string): Promise<any> {
    const res = await axios.post(this.apiUrl, { text });
    return res.data;
  }
}
