import {
  ActivityIcon,
  VideoIcon,
  ProfileIcon,
  PlusOutline,
} from "../assets/icons";
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
} from "@ui-kitten/components";

import { HomeScreen } from "../screens/HomeScreen";
import React from "react";
import { StoryDetailsScreen } from "../screens/StoryDetailsScreen";
import { VideosScreen } from "../screens/VideosScreen";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import { SignupScreen } from "../screens/authentication/SignupScreen";
import PasswordResetScreen from "../screens/authentication/PasswordResetScreen";
import EventDetailedScreen from "../screens/Events/EventDetailedScreen";
import EventsScreen from "../screens/Events/EventsScreen";
import CheckInScreen from "../screens/Profile/UserCheckInScreen";
import AddEventScreen from "../screens/AddEvent/AddEventScreen";
import SearchResults from "../screens/Search/SearchResults";
import CheckinScannerScreen from "../screens/Profile/CheckinScannerScreen";
import EditProfileDetailsScreen from "../screens/Profile/EditProfileDetailsScreen";
import EditEventScreen from "../screens/Events/EditEventScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <View>
    <Divider />
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={
        {
          // borderTopLeftRadius: 50,
          // borderTopRightRadius: 50,
          // marginTop: -35,
          // color: "black",
          // borderTopWidth: 2,
          // borderLeftWidth: 2,
          // borderRightWidth: 2,
          // borderColor: "rgba(226, 226, 226,1)",
        }
      }
    >
      <BottomNavigationTab title="Events" icon={ActivityIcon} />
      <BottomNavigationTab title="AddEvent" icon={PlusOutline} />
      <BottomNavigationTab title="Profile" icon={ProfileIcon} />
    </BottomNavigation>
  </View>
);

export const BottomTabsNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={EventsScreen} />
    {/* The bottom tab follow 1..2...3 order so whatever screen is second here it will be selected by the #2 bottom tab */}
    {/* <Screen name="Videos" component={VideosScreen} /> */}
    <Screen name="AddEvent" component={AddEventScreen} />
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="Details" component={StoryDetailsScreen} />
    <Screen name="Signup" component={SignupScreen} />
    <Screen name="Reset" component={PasswordResetScreen} />
    <Screen name="EventDetails" component={EventDetailedScreen} />
    <Screen name="CheckIn" component={CheckInScreen} />
    <Screen name="CheckInScanner" component={CheckinScannerScreen} />
    <Screen name="SearchResults" component={SearchResults} />
    <Screen name="EditProfileDetails" component={EditProfileDetailsScreen} />
    <Screen name="EditEventScreen" component={EditEventScreen} />
  </Navigator>
);
