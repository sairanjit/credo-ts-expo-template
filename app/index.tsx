import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default HomeScreen
