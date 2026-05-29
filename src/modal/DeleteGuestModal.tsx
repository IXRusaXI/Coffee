import { Modal, Text } from "@mantine/core";
import type { BaseModalProps } from "../types/BaseModalProps";

function DeleteGuestModal({ guest, opened, onConfirm, onClose }: BaseModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Удалить клиента?">
      <Text>
        Удалить гостя {guest?.name} ({guest?.phone}) и все его бонусы?
      </Text>
      <div className="modal-footer">
        <button className="modal-button" onClick={onConfirm}>
          Удалить
        </button>
        <button className="modal-button" onClick={onClose}>
          Отмена
        </button>
      </div>
    </Modal>
  );
}

export { DeleteGuestModal };