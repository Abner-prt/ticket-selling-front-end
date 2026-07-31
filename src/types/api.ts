export interface ResponseDto<T> {
  statusCode: number;
  message: string;
  status: boolean;
  data: T;
}

export interface EventDto {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  totalTickets: number;
  availableTickets: number;
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface AuthResponseDto {
  user: UserDto;
  token: string;
}

export interface OrderItemDto {
  eventId: number;
  eventTitle: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderHistoryDto {
  id: number;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
  items: OrderItemDto[];
}
