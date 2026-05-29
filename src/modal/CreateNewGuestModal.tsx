import { Button, Divider, Group, Input, Modal, Portal, Stack, Text } from "@mantine/core";
import { useState } from "react";

interface NewGuestModalProps {
    opened: boolean;
    onConfirm: (name: string, phone: String) => void;
    onClose: () => void;
}

function CreateNewGuestModal({opened, onConfirm, onClose }: NewGuestModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    function saveGuest() {
        onConfirm(name, phone);
        setName('');
        setPhone('');
        onClose();
    }

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
        opened={opened} onClose={onClose} title={"Добавить гостя"}>
          
          {/* <Text mb="md" c='#a5a5a5' size='12px'>
            {guest?.name} {guest?.phone}
          </Text> */}
          <Stack gap="md" mb="sm" mt="sm">
            <Input className="guest-input" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)}/>
            <Input className="guest-input" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </Stack>


          
          <Group gap="md" justify="right" w="100%">
            <Button onClick={saveGuest} bg="#05940060">
              Сохранить
            </Button>
          </Group>
        </Modal>
      </Portal>
  );
}

export { CreateNewGuestModal };