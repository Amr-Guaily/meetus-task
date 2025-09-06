export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://api-yeshtery.dev.meetusvr.com/v1';

// LocalStorage keys
export const STORAGE_KEYS = {
  user_id: 'meetus_user_id',
  user_name: 'meetus_user_name',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;

// Types for each key
export type StorageKeyTypes = {
  user_id: string;
  user_name: string;
};
