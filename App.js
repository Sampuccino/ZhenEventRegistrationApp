import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import { AppNavigator } from "./navigation/AppNavigator";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import configureStore from "./store/configureStore";
import { default as mapping } from "./mapping.json";
import { connect, Provider } from "react-redux";

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <Provider store={configureStore}>
      <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
    </Provider>
  </>
);

// *****Default Code****
/* import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
