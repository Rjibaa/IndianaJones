/**
 * Some helper functions to manipulate Time.
 */

export function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function calculateArrivalTime(
  departureTime: string,
  travelTime: string,
  previousArrivalTime?: string,
): number {
  const departureTimeInMinutes = parseTime(departureTime);
  const travelTimeInMinutes = parseTime(travelTime);

  let arrivalTime;
  if (previousArrivalTime) {
    arrivalTime = parseTime(previousArrivalTime);
    arrivalTime = +travelTimeInMinutes;
  } else {
    arrivalTime = departureTimeInMinutes + travelTimeInMinutes;
  }

  return arrivalTime;
}
