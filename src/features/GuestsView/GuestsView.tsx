// src/features/guests/GuestsView.tsx
import { useState } from 'react';
import {
  Button,
  Group,
  Stack,
  TextInput,
  Table,
  Image,
  Paper,
  Text,
} from '@mantine/core';
import searchIcon from '../../icons/search.svg';
import deleteIcon from '../../icons/delete.svg';
import type { Guest } from '../../types/Guest';
import './style.scss';
import { DeleteGuestModal } from '../../modal/DeleteGuestModal';
import { CreateNewGuestModal } from '../../modal/CreateNewGuestModal';

const initialGuests: Guest[] = [
  {
    id: 1,
    name: 'Дмитрий',
    phone: '+7 (999) 999-99-99',
    points: 0,
    smallTaken: 0,
    largeTaken: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Диана',
    phone: '+7 (987) 123-45-67',
    points: 0,
    smallTaken: 0,
    largeTaken: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function GuestsView() {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isCreateModalOpened, setCreateModalOpened] = useState(false);
  const [points, setPoints] = useState<number | ''>(0);

  function handleAddGuest(name: string, phone: String) {
    if (!name.trim() || !phone.trim()) return;

    const newGuest: Guest = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      points: typeof points === 'number' ? points : 0,
      smallTaken: 0,
      largeTaken: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setGuests((prev) => [...prev, newGuest]);
    setName('');
    setPhone('');
    setPoints(0);
  }

  function addPoint(id?: number) {
    if (!id) return;

    setGuests((prev) => prev.map((guest) => (guest.id === id ? { ...guest, points: guest.points + 1 } : guest)));
  }

  function removePoints(id?: number, points?: number) {
    if (!id) return;
    if (!points) return;

    setGuests((prev) => prev.map((guest) => (guest.id === id && guest.points >= points ? { ...guest, points: guest.points - points } : guest)));
  }

  return (
    <Stack gap="md">
      <DeleteGuestModal guest={initialGuests[0]} opened={false} onConfirm={() => {}} onClose={() => {}} />
      <CreateNewGuestModal opened={isCreateModalOpened} onConfirm={handleAddGuest} onClose={() => setCreateModalOpened(false)} />
      <Group justify="space-between" align="center">
        <Group gap={5}>
          <TextInput
            placeholder="Поиск"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            w={400}
            className="guest-input"
          />
          <Button
            // onClick={handleAddGuest}
            p={0}
            style={{
              backgroundColor: '#919191',
              boxShadow: '0 0 6px 1px rgba(0, 0, 0)',
            }}
          >
            <Image src={searchIcon} width={20} height={20} m={10} />
          </Button>
        </Group>

        <Button
          onClick={() => setCreateModalOpened(true)}
          style={{
            backgroundColor: '#0000006e',
            boxShadow: '0 0 6px 1px rgba(0, 0, 0)',
          }}
        >
          Добавить гостя
        </Button>

        <Button
          // onClick={handleAddGuest}
          style={{
            backgroundColor: '#0000006e',
            boxShadow: '0 0 6px 1px rgba(0, 0, 0)',
          }}
        >
          Закрыть смену
        </Button>
      </Group>

      <Paper
        bg="#363636"
        style={{
          boxShadow: '0 0 6px 2px black',
        }}
      >
        <Table
          withColumnBorders
          borderColor="#000000"
        >
          <Table.Thead c="#cccccc">
            <Table.Tr>
              <Table.Th ta="center">Имя</Table.Th>
              <Table.Th ta="center">Телефон</Table.Th>
              <Table.Th ta="center">Баллы</Table.Th>
              <Table.Th ta="center">Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody >
            {guests.length === 0 ? (
              <Table.Tr>
                <Table.Td
                  colSpan={4}
                  style={{
                    backgroundColor: '#2b2b2b',
                    color: '#f0f0f0',
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  Пока нет гостей — добавь первого.
                </Table.Td>
              </Table.Tr>
            ) : (
              guests.map((guest, index) => (
                <Table.Tr
                  key={guest.id}
                  style={{
                    backgroundColor: '#2b2b2b',
                    color: '#f0f0f0',
                  }}
                >
                  <Table.Td style={{borderRadius: index === guests.length - 1 ? '0 0 0 10px' : ''}}>{guest.name}</Table.Td>
                  <Table.Td >{guest.phone}</Table.Td>
                  <Table.Td >{guest.points}</Table.Td>
                  <Table.Td style={{borderRadius: index === guests.length - 1 ? '0 0 10px 0' : ''}}>
                    <Group gap="xs" justify="space-around">
                      <Button size="xs" bg={'#52ce5c'} onClick={() => addPoint(guest.id)}>
                        +1
                      </Button>
                      <Group>
                        <Button size="xs" variant="light" onClick={() => removePoints(guest.id, 8)}>
                          <Text size='12px' fw={600}>
                            Маленький
                          </Text>
                        </Button>
                        <Button size="xs" variant="light" onClick={() => removePoints(guest.id, 16)}>
                          <Text size='18px' fw={600}>
                            Большой
                          </Text>
                        </Button>
                      </Group>
                      <Button size="xs" color="red" variant="light" px={8}>
                        <Image src={deleteIcon} width={18} height={18}/>
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}