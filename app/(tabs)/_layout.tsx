import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen options={{title: "Conversas"}} name="(chat)" />
      <Tabs.Screen options={{title: "Configurações"}} name="(settings)" />
    </Tabs>
  );
}
