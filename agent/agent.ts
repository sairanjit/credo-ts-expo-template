import {
  Agent,
  ConnectionsModule,
  ConsoleLogger,
  LogLevel,
} from "@credo-ts/core"
import { AskarModule } from "@credo-ts/askar"
import { agentDependencies } from "@credo-ts/react-native"
import { ariesAskar } from "@hyperledger/aries-askar-react-native"

export type AppAgent = Awaited<ReturnType<typeof initializeAppAgent>>

export const initializeAppAgent = async ({
  walletLabel,
}: {
  walletLabel: string
}) => {
  const agent = new Agent({
    dependencies: agentDependencies,
    config: {
      label: walletLabel,
      walletConfig: {
        id: "walletId",
        key: "secure-wallet-key",
      },
      autoUpdateStorageOnStartup: true,
      logger: new ConsoleLogger(LogLevel.debug),
    },
    modules: {
      ariesAskar: new AskarModule({
        ariesAskar,
      }),
      connections: new ConnectionsModule({
        autoAcceptConnections: true,
      }),
    },
  })

  await agent.initialize()

  return agent
}
