import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { Observable, Subscriber } from 'rxjs';
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


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
export const timeStringToMilliseconds = (timeString: string): number => {
  console.log({ timeString });
  
  const timeMoment = moment(timeString, "HH:mm:ss");
  const milliseconds = timeMoment.diff(moment().startOf('day'));
  console.log({ timeMoment ,milliseconds});
  return milliseconds;
}
export const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray = isParamTypeObject && (params[key].length >= 0);

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {      
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};