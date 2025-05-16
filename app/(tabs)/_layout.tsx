import { Tabs } from 'expo-router';

const TabsLayout = () => (
  <Tabs>
    <Tabs.Screen name='map' options={{ title: 'Map' }} />
    <Tabs.Screen name='feed' options={{ title: 'Feed' }} />
    <Tabs.Screen name='new-post' options={{ title: 'New Post' }} />
    <Tabs.Screen name='profile' options={{ title: 'Profile' }} />
    <Tabs.Screen name='index' options={{ href: null }} />
  </Tabs>
);

export default TabsLayout;
