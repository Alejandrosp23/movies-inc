import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen 
        name="index"
        options={{
          title: 'Movies',
        }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            title: 'Movie Details',
          }} />
    </Stack>
  );
}
