import { View, StyleSheet, Image, ScrollView } from "react-native";
import React, { Component, useState } from "react";
import {
  Layout,
  Tab,
  TabView,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";
import EventGeneral from "./EventGeneral";
import EventCard from "./EventCard";

// Tab menu toggle

export const ProfileUserDetails = () => {
  const [toggle, setToggle] = useState(1);

  const toggleTab = (tab) => {
    // alert(tab);
    setToggle(tab);
  };

  const tabs = () => {
    return (
      <Layout style={styles.tabContainer}>
        {/* Top Tabs */}
        {/* Organizer */}
        <Layout style={toggle === 1 ? styles.tabActive : styles.tabInactive}>
          <Text
            style={toggle === 1 ? styles.tabActiveText : styles.tabInactiveText}
            onPress={() => toggleTab(1)}
          >
            I am the Organizer
          </Text>
        </Layout>
        {/* Participant */}
        <Layout style={toggle === 2 ? styles.tabActive : styles.tabInactive}>
          <Text
            style={
              toggle === 2 ? styles.tabActiveTextRight : styles.tabInactiveText
            }
            onPress={() => toggleTab(2)}
          >
            I am the Participant
          </Text>
        </Layout>
      </Layout>
    );
  };

  const tabView = () => {
    if (toggle === 1) {
      return (
        <Layout>
          <EventCard />
        </Layout>
      );
    }
  };
  return (
    <ScrollView>
      <Layout style={styles.container}>
        {/* Header */}
        <Layout style={styles.hero}>
          <Text
            category="h6"
            style={{
              fontWeight: "bold",
              paddingLeft: 15,
              marginTop: 25,
              color: "white",
            }}
          >
            Event Registration
          </Text>
          <Button style={styles.signoutBtn} status="basic" size="small">
            Sign Out
          </Button>
        </Layout>
        {/* Content Main Container */}
        <Layout style={styles.body}>
          {/* Image / Username / ID Container */}
          <Layout
            style={{
              marginTop: -70,
              alignItems: "center",
              backgroundColor: "rgba(52, 52, 52, alpha)",
            }}
          >
            {/* Image with ring background and photo icon */}
            <Layout style={styles.profileImageBackside}>
              <Image
                style={styles.profileImage}
                source={require("../../../assets/Screenshot_from_2022.png")}
              />
              <Button style={styles.cameraUploadButton}>
                <Icon style={styles.icon} name="camera" />
              </Button>
            </Layout>

            <Text category="h4" style={{ marginTop: 15 }}>
              Firstname Lastname
            </Text>
            <Text style={{ fontWeight: "bold", marginTop: 10 }}>
              Member ID: 002
            </Text>
          </Layout>

          {/* Email / Zip / Phone / EDIT */}
          <Layout style={styles.userDetailsContainerParent}>
            {/* Name */}
            <Layout style={styles.userDetailsContainer}>
              <Text style={styles.userDetail_1}>Email</Text>
              <Text style={styles.userDetail_2}>Email@email.com</Text>
              <Text style={styles.userDetail_3}>
                <Icon
                  style={styles.iconDetail}
                  name="arrow-ios-forward-outline"
                />
              </Text>
            </Layout>

            {/* Zipcode */}
            <Layout style={styles.userDetailsContainer}>
              <Text style={styles.userDetail_1}>Zipcode</Text>
              <Text style={styles.userDetail_2}>00000</Text>
              <Text style={styles.userDetail_3}>
                <Icon
                  style={styles.iconDetail}
                  name="arrow-ios-forward-outline"
                />
              </Text>
            </Layout>
            {/* Phone */}
            <Layout style={styles.userDetailsContainer}>
              <Text style={styles.userDetail_1}>Phone</Text>
              <Text style={styles.userDetail_2}>+1 000 0000</Text>
              <Text style={styles.userDetail_3}>
                <Icon
                  style={styles.iconDetail}
                  name="arrow-ios-forward-outline"
                />
              </Text>
            </Layout>
          </Layout>

          {/* Tabbed View Organizer / Participant */}
          {/* <Layout style={styles.tabbar}>
              <TabView selectedIndex={0} onSelect={0}>
                <Tab
                  title={(evaProps) => (
                    <Text
                      category="p1"
                      style={{ color: "#301A4B", fontWeight: "bold" }}
                    >
                      I am a participant
                    </Text>
                  )}
                >
                  <EventGeneral />
                </Tab>
                <Tab title="I am the Participant">
                  <Layout>
                    <Text category="h5">ORDERS</Text>
                  </Layout>
                </Tab>
              </TabView>
            </Layout> */}
          {tabs()}
          {tabView()}
        </Layout>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
    marginTop: -25,
  },
  about: {
    paddingLeft: 10,
    marginTop: 10,
  },
  tabbar: {
    padding: 20,
  },
  tab: { marginBottom: 50 },
  hero: {
    backgroundColor: "#301A4B",
    height: 175,
    display: "flex",
    flexDirection: "row",
  },
  signoutBtn: {
    color: "white",
    marginLeft: "auto",
    marginTop: 25,
    marginRight: 15,
    height: 15,
    borderRadius: 20,
    borderWidth: 0,
  },
  profileImageBackside: {
    borderWidth: 3,
    borderColor: "#E26D7D",
    padding: 8,
    borderRadius: 100,
    backgroundColor: "rgba(52, 52, 52, 0)",
    position: "relative",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  cameraUploadButton: {
    zIndex: 1,
    position: "absolute",
    bottom: -10,
    right: -10,
    borderRadius: 50,
    backgroundColor: "#3F295A",
    borderColor: "white",
    borderWidth: 4,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  userDetailsContainerParent: {
    padding: 20,
    marginTop: 20,
  },
  userDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
  userDetail_1: {
    width: "35%",
    fontWeight: "bold",
    color: "#454545",
  },
  userDetail_2: {
    width: "60%",
  },
  userDetail_3: {
    width: "5%",
    marginRight: 0,
  },
  iconDetail: {
    width: 25,
    height: 25,
    tintColor: "black",
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "orange",
    padding: 20,
  },
  tabActive: {
    borderBottomWidth: 2.5,
    borderColor: "#3F295A",
    width: "50%",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
  tabActiveText: {
    color: "#3F295A",
    fontWeight: "700",
    // backgroundColor: "lightpink",
    padding: 15,
    borderRightWidth: 1,
    borderRightColor: "#969595",
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    textAlign: "center",
  },
  tabActiveTextRight: {
    color: "#3F295A",
    fontWeight: "700",
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: "#969595",
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    textAlign: "center",
  },
  tabInactive: {
    borderBottomWidth: 2.5,
    borderColor: "#969595",
    width: "50%",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
  tabInactiveText: {
    fontWeight: "700",
    // backgroundColor: "lightgreen",
    color: "#969595",
    padding: 20,
  },
});

export default ProfileUserDetails;
