import { useSyncExternalStore } from "react";

type ViewerState = {
  open: boolean;
  /** Id of the image on show. */
  id: string;
};

const CLOSED: ViewerState = { open: false, id: "" };

let state = CLOSED;
const listeners = new Set<() => void>();

function set(next: ViewerState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Opens and pages the image viewer. Any trigger on the page can call it; the viewer renders once per page. */
export const viewer = {
  open(id: string) {
    set({ open: true, id });
  },
  go(id: string) {
    if (state.open && id !== state.id) set({ ...state, id });
  },
  close() {
    // Keep the id so the closing fade still shows the image.
    if (state.open) set({ ...state, open: false });
  },
};

export function useViewer() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => CLOSED,
  );
}
