import React from "react";
import { Stack } from "expo-router";

/**
 * Layout component for the application, defining the navigation stack
 * and specifying which screens are available without showing headers.
 * The screens included are:
 * - index
 * - AboutUs
 * - PartnerWithUs
 * - admin
 * @return {JSX.Element} The rendered layout containing the navigation stack.
 */
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="AboutUs" options={{ headerShown: false }} />
      <Stack.Screen name="PartnerWithUs" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
    </Stack>
  );
}
