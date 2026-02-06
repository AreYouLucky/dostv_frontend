
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import DOMPurify from 'dompurify';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function purifyDom(text:string){
  return DOMPurify.sanitize(text);
}