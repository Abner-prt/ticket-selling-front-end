export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  category: 'Concierto' | 'Deportes' | 'Teatro' | 'Festival' | 'Familiar';
  price: number;
  availableTickets: number;
}
