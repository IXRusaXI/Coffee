import type { Guest } from "./Guest";

export interface BaseModalProps {
  guest: Guest | null;
  opened: boolean;
  onConfirm: () => void;
  onClose: () => void;
}