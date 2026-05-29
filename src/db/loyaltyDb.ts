import Dexie, { type EntityTable } from 'dexie';
import type { Guest } from '../types/Guest';

export interface BackupMeta {
  id?: number;
  createdAt: string;      // дата/время создания бэкапа
  recordCount: number;
}

export class LoyaltyDB extends Dexie {
  guests!: EntityTable<Guest, 'id'>;
  backups!: EntityTable<BackupMeta, 'id'>;

  constructor() {
    super('loyalty-db');
    this.version(1).stores({
      guests: '++id, phone, name',
      backups: '++id, createdAt',
    });
  }
}

export const db = new LoyaltyDB();