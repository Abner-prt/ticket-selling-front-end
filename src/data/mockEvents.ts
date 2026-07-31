import type { Event } from '../types';

export const mockEvents: Event[] = [
  {
    id: 1,
    title: 'The Weeknd - After Hours Tour',
    description: 'Disfruta de una noche increíble con The Weeknd interpretando sus grandes éxitos.',
    date: '2026-10-15T20:30:00Z',
    location: 'Estadio Nacional',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop',
    category: 'Concierto',
    price: 150.00,
    totalTickets: 1000,
    availableTickets: 500
  },
  {
    id: 2,
    title: 'Final Liga de Campeones',
    description: 'El evento deportivo más esperado del año. Compra tus boletos ahora.',
    date: '2026-05-30T14:00:00Z',
    location: 'Estadio Olímpico',
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop',
    category: 'Deportes',
    price: 300.00,
    totalTickets: 2000,
    availableTickets: 120
  },
  {
    id: 3,
    title: 'El Fantasma de la Ópera',
    description: 'El clásico musical llega con una producción renovada y un elenco de lujo.',
    date: '2026-11-05T19:00:00Z',
    location: 'Teatro Principal',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=2069&auto=format&fit=crop',
    category: 'Teatro',
    price: 85.00,
    totalTickets: 500,
    availableTickets: 300
  },
  {
    id: 4,
    title: 'Tomorrowland Winter',
    description: 'El festival de música electrónica más famoso del mundo en edición especial.',
    date: '2027-03-20T12:00:00Z',
    location: 'Recinto Ferial',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop',
    category: 'Festival',
    price: 250.00,
    totalTickets: 5000,
    availableTickets: 1000
  },
  {
    id: 5,
    title: 'Disney on Ice',
    description: 'Magia y diversión sobre hielo para toda la familia.',
    date: '2026-12-10T16:00:00Z',
    location: 'Arena Ciudad',
    imageUrl: 'https://images.unsplash.com/photo-1520630635439-65ea7b27be29?q=80&w=2070&auto=format&fit=crop',
    category: 'Familiar',
    price: 45.00,
    totalTickets: 1500,
    availableTickets: 800
  },
  {
    id: 6,
    title: 'Coldplay - Music of the Spheres',
    description: 'Un viaje musical inolvidable lleno de colores y energía.',
    date: '2026-09-22T21:00:00Z',
    location: 'Estadio Nacional',
    imageUrl: 'https://images.unsplash.com/photo-1540039155732-6761b3341064?q=80&w=2070&auto=format&fit=crop',
    category: 'Concierto',
    price: 180.00,
    totalTickets: 2500,
    availableTickets: 0
  }
];
