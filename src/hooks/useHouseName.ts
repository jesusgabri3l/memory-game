import { useState } from 'react';

import { HOUSE_STORAGE_KEY } from '../gameConfig';

function readStoredHouseName(): string | null {
  try {
    return sessionStorage.getItem(HOUSE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function useHouseName() {
  const [houseName, setHouseNameState] = useState<string | null>(readStoredHouseName);

  const setHouseName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      sessionStorage.setItem(HOUSE_STORAGE_KEY, trimmed);
    } catch {
      // sessionStorage unavailable (privacy mode) — keep it in memory for this render only
    }
    setHouseNameState(trimmed);
  };

  return { houseName, setHouseName };
}
