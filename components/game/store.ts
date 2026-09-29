"use client";

import { useSyncExternalStore } from "react";

export type DialogState = { speaker: string; text: string } | null;

export type GameState = {
  dialog: DialogState;
};

export const INITIAL: GameState = {
  dialog: null,
};

class GameStore {
  private state: GameState = INITIAL;
  private listeners = new Set<() => void>();

  get = () => this.state;

  subscribe = (l: () => void) => {
    this.listeners.add(l);
    return () => {
      this.listeners.delete(l);
    };
  };

  set = (patch: Partial<GameState>) => {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((l) => l());
  };
}

export const gameStore = new GameStore();

export function useGame<T>(selector: (state: GameState) => T): T {
  return useSyncExternalStore(
    gameStore.subscribe,
    () => selector(gameStore.get()),
    () => selector(INITIAL)
  );
}