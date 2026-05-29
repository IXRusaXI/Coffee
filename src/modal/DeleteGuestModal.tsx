import { Button, Divider, Group, Modal, Portal, Text } from "@mantine/core";
import type { BaseModalProps } from "../types/BaseModalProps";

function DeleteGuestModal({ guest, opened, onConfirm, onClose }: BaseModalProps) {
  return (
      <Portal>
        <Modal 
        styles={{
          content: {
            backgroundColor: '#363636', // фон модалки
            color: '#f0f0f0',          // текст, чтобы был читаемым
            boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.7)',
          },
          header: {
            backgroundColor: '#363636',
            color: '#3a3a3a',          
          },
          title: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#a5a5a5',
          },
          close: {
            color: '#a5a5a5',
          }
        }}
        opened={opened} onClose={onClose} title={"Удалить клиента?"}>
          
          <Text mb="md" c='#a5a5a5' size='12px'>
            {guest?.name} {guest?.phone}
          </Text>

          
          <Group gap="md" justify="right" w="100%">
            <Button onClick={onConfirm} bg="#cf000060">
              Удалить
            </Button>
          </Group>
        </Modal>
      </Portal>
  );
}

export { DeleteGuestModal };