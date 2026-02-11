import { Product, Review, Bundle } from './types';

// This file now contains only data that is not fetched from the API.
// The main product data is now fetched from fakestoreapi.com via src/lib/api.ts

export const reviews: Review[] = [
  // Keeping reviews here, but they are not currently displayed on product pages
  // as they are not associated with the new dynamic product IDs.
  {
    id: 'rev-1',
    productId: '1',
    author: 'Jessica L.',
    rating: 5,
    title: 'Holy Grail Serum!',
    body: "I've been using this for a month and my skin has never looked better. My dark spots are fading and I have a natural glow!",
    date: 'June 15, 2024',
  },
  {
    id: 'rev-2',
    productId: '2',
    author: 'Emily R.',
    rating: 5,
    title: 'So Refreshing',
    body: 'I keep this on my desk and spritz it throughout the day. It smells amazing and keeps my skin from feeling dry.',
    date: 'June 12, 2024',
  },
  {
    id: 'rev-3',
    productId: '3',
    author: 'Sarah P.',
    rating: 5,
    title: 'Woke up to baby soft skin',
    body: "This night cream is so luxurious without being greasy. My skin feels incredibly soft and plump in the morning.",
    date: 'June 10, 2024',
  },
];
