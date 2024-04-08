import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  //Function to format Time to be a string in this format : HH:MM
  formatTime(time: { hour: number; minute: number }): string {
    const padZero = (num: number) => (num < 10 ? '0' + num : num);
    const { hour, minute } = time;
    const formattedHour = padZero(hour);
    const formattedMinute = padZero(minute);
    const formattedDepartureTime = `${formattedHour}:${formattedMinute}`;
    return formattedDepartureTime;
  }

  //Function to capitalize the first letter of a word
  capitalizeFirstLettre(word: string): string {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1).toLowerCase();
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
  }
}
