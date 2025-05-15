import { Tabs } from 'expo-router';

const RootLayout = () => (
  <Tabs>
    <Tabs.Screen name='map' options={{ title: 'Map' }} />
    <Tabs.Screen name='feed' options={{ title: 'Feed' }} />
    <Tabs.Screen name='new-post' options={{ title: 'New Post' }} />
    <Tabs.Screen name='auth' options={{ title: 'Auth' }} />
  </Tabs>
);

export default RootLayout;
