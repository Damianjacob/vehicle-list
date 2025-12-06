import { Stack } from "expo-router";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function StackLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Stack.Screen
                name="Car Detail"
                options={{
                    title: "Explore",
                    //   tabBarIcon: ({ color }) => (
                    //       <IconSymbol
                    //           size={28}
                    //           name="paperplane.fill"
                    //           color={color}
                    //       />
                    //   ),
                }}
            />
        </Stack>
    );
}
