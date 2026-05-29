// src/App.tsx
import { Title, Stack, Paper } from '@mantine/core';
import { GuestsView } from '../features/GuestsView/GuestsView';

function App() {
  return (
    <Paper
      bg="#3a3a3a"
      style={{
        minHeight: '100vh',
        borderRadius: '0',    // серый фон до низа страницы
      }}
    >
      <Title order={3} ta="left" p="15px" bg='#858585' style={{borderRadius: '8px'}}>
        Бодрый кофе
      </Title>

      <Stack gap="md">
        <Paper
          p="md"
          bg="#3a3a3a"
          style={{
            borderRadius: '0',    // серый фон до низа страницы
          }}
        >
          <GuestsView />
        </Paper>
      </Stack>
    </Paper>
  );
}

export default App;