import { db } from '../db/loyaltyDb';
import type { Guest } from '../types/Guest';

const now = () => new Date().toISOString();

export async function addGuest(data: {
  name: string;
  phone: string;
}): Promise<number | undefined> {
  const guest: Guest = {
    name: data.name.trim(),
    phone: data.phone.trim(),
    points: 0,
    smallTaken: 0,
    largeTaken: 0,
    createdAt: now(),
    updatedAt: now(),
  };

  return db.guests.add(guest);
}

export async function addPoints(id: number, amount: number) {
  const guest = await db.guests.get(id);
  if (!guest) return;

  await db.guests.update(id, {
    points: guest.points + amount,
    updatedAt: now(),
  });
}

export async function redeemSmall(id: number) {
  const guest = await db.guests.get(id);
  if (!guest) return;

  // пример: списываем 9 баллов за маленький кофе
  if (guest.points < 8) return;

  await db.guests.update(id, {
    points: guest.points - 8,
    smallTaken: guest.smallTaken + 1,
    updatedAt: now(),
  });
}

export async function redeemLarge(id: number) {
  const guest = await db.guests.get(id);
  if (!guest) return;

  // пример: списываем 12 баллов за большой кофе
  if (guest.points < 16) return;

  await db.guests.update(id, {
    points: guest.points - 16,
    largeTaken: guest.largeTaken + 1,
    updatedAt: now(),
  });
}

export async function deleteGuest(id: number) {
  await db.guests.delete(id);
}