export interface Guest {
  id?: number;
  name: string;
  phone: string;
  points: number;          // текущие баллы (например, сколько копится до подарка)

  smallTaken: number;      // сколько маленьких уже выдано
  largeTaken: number;      // сколько больших уже выдано

  createdAt: string;       // ISO-строка: new Date().toISOString()
  updatedAt: string;
}