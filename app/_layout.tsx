import "react-native-get-random-values"
import "fast-text-encoding"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import "react-native-reanimated"

import AgentProvider from "@credo-ts/react-hooks"
import { PaperProvider } from "react-native-paper"
import { LogBox, useColorScheme } from "react-native"
import { AppAgent, initializeAppAgent } from "../agent"
LogBox.ignoreAllLogs() //Ignore all log notifications

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [agent, setAgent] = useState<AppAgent>()
  const colorScheme = useColorScheme()

  // Initialize agent
  useEffect(() => {
    if (agent) return

    const startAgent = async () => {
      try {
        const newAgent = await initializeAppAgent({ walletLabel: "Kevin" })
        if (!newAgent) return

        setAgent(newAgent)
      } catch (error) {
        console.log("Error initializing agent", error)
      }
    }

    void startAgent()
  }, [])

  useEffect(() => {
    if (agent) {
      SplashScreen.hideAsync()
    }
  }, [agent])

  if (!agent) {
    return null
  }

  return (
    <AgentProvider agent={agent}>
      <PaperProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack initialRouteName="index">
            {/* <Stack.Screen
              options={{
                presentation: "modal",
                title: "Scan QR Code",
              }}
              name="scan"
            /> */}
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </AgentProvider>
  )
}
