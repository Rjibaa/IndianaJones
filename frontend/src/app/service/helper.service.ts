import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  formatTime(time: { hour: number; minute: number }): string {
    const padZero = (num: number) => (num < 10 ? '0' + num : num);
    const { hour, minute } = time;
    const formattedHour = padZero(hour);
    const formattedMinute = padZero(minute);
    const formattedDepartureTime = `${formattedHour}:${formattedMinute}`;
    return formattedDepartureTime;
  }

  capitalizeFirstLettre(word: string): string {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1).toLowerCase();
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
  }
}
