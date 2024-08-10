import { string } from 'yup';

type License = {
  sources: string[];
  title: string;
  license: string;
  disclaimer: string;
};
export const licenses: License[] = [
  {
    sources: ['Sneaky Snitch by Kevin MacLeod'],
    title: 'Music promoted by https://www.chosic.com/free-music/all/',
    license: 'Creative Commons CC BY 3.0',
    disclaimer:
      'This work is licensed under a Creative Commons Attribution 3.0 International License.',
  },
];
