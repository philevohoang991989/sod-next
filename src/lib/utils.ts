import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { Observable, Subscriber } from 'rxjs';

export const convertToBase64 = (blob: Blob): Observable<string> => {
  return new Observable((o: Subscriber<string>) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);

    fileReader.onload = () => {
      o.next(fileReader.result?.toString() || "");
      o.complete();
    };

    fileReader.onerror = (error) => {
      o.error(error);
      o.complete();
    };
  });
};
