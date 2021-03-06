import {
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Input,
  Layout,
  Text,
  Button,
  Avatar,
  Spinner,
  Divider,
} from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupScreen from "./SignupScreen";
import PasswordResetScreen from "./PasswordResetScreen";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { setUser, setAuthenticated } from "../../store/actions/user";
import { CloseOutline } from "../../assets/icons";
import ROOT_URL from "../../settings.json";
import EXPO_GO_CLIENT_SECRET from "../../expo.auth.json";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  /** GOOGLE ******************/
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_GO_CLIENT_SECRET.expoClientId,
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });
  /** GOOGLE ******************/
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);
  const authenticated = useSelector(
    (state) => state.eventsAndUsers.authenticated
  );

  // Temporarily toggle to switch between the Login view and the Google/Signup view
  const [signup, setSignup] = useState(1);
  const [forgotPassword] = useState(false);

  // state for authenticated
  const [loaded, setLoaded] = useState(false);

  // Loaded from AsyncStorage
  const [accounts, setAccounts] = useState([]);

  // Fields
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // Spinner
  const [awaiting, setAwaiting] = useState(false);

  const navigation = useNavigation();

  const navigateForgotPassword = () => {
    navigation.navigate("Reset");
  };

  const navigateSignup = () => {
    navigation.navigate("Signup");
  };

  const _retrieveData = async () => {
    // console.log("Retrieving data!");
    try {
      const value = await AsyncStorage.getItem("account");
      if (value !== null) {
        // Our data is fetched successfully
        const acc = JSON.parse(value);
        // console.log("We have account data of ", acc);
        // console.log("We have account data of");

        // Set loaded to true to show the List
        setLoaded(true);
        // Update accounts state with accounts
        setAccounts(acc);
      } else {
        console.log("We have no key set");
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const continueWithUser = async (user) => {
    setAwaiting(true);
    await axios
      .post(`${ROOT_URL.api}/quicklogin`, {
        id: user.id,
        email: user.email,
        token: user.token,
      })
      .then(({ data, status }) => {
        setAwaiting(false);
        dispatch(setUser(data));
        dispatch(setAuthenticated(true));
        // Set logged in state and user to details
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  const onRemoveAccount = (account) => {
    // Update the accounts to remove the one selected
    const updatedAccounts = accounts.filter((acc) => acc.uuid !== account.uuid);
    // Update State
    setAccounts([...updatedAccounts]);
    // Save accounts items to Async
    AsyncStorage.setItem("account", JSON.stringify([...updatedAccounts]));
    // await AsyncStorage.setItem("account", JSON.stringify([...updatedAccounts]));
  };

  const renderAccountsList = () => {
    if (accounts.length) {
      return accounts.map((account) => {
        return (
          <Layout style={styles.accountItem} key={account.uuid}>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => continueWithUser(account)}
            >
              <Avatar
                style={{ width: 35 }}
                source={require("../../assets/quick_login_default.png")}
                // source={{
                //   // uri: "https://cdn.pixabay.com/photo/2016/07/31/13/43/dog-1558962_960_720.jpg",\
                //   // uri: account.profile_image_src,
                //   uri: "http:10.0.2.2:8000/img/tc_logo.png",
                // }}
                shape="square"
              />
              <Text style={styles.accountName}>{account.name}</Text>
              <Button
                style={{
                  marginLeft: 10,
                }}
                size="medium"
                appearance="ghost"
                status="danger"
                accessoryLeft={CloseOutline}
                onPress={() => onRemoveAccount(account)}
              />
            </TouchableOpacity>
          </Layout>
        );
      });
    }
  };

  // Validations
  const onEmailBlur = () => {
    email.length ? setEmailError(true) : null;
  };

  const onPasswodBlur = () => {
    password.length ? setPasswordError(true) : null;
  };

  const onLogin = async () => {
    if (emailError && passwordError) {
      setAwaiting(true);
      await axios
        .post(`${ROOT_URL.api}/login`, {
          email: email,
          password: password,
        })
        .then(async ({ data, status }) => {
          // setAwaiting(false);
          // Add user to Async if not available.
          /**
         *     try {
      await AsyncStorage.setItem("account", JSON.stringify([user]));
      console.log("Async User Saved");
    } catch (error) {}
         * 
         */
          // console.log("Login data of ", data);
          const accs = await AsyncStorage.getItem("account");
          if (accs === null) {
            // We have NO data!!
            // Set new account
            // console.log("Null accounts");
            AsyncStorage.setItem("account", JSON.stringify([data]));
          } else {
            // Add account if it does not exist
            if (accounts.length <= 0) {
              // console.log("Account doesn exist");
              AsyncStorage.setItem("account", JSON.stringify([data]));
            } else {
              accounts.forEach((el) => {
                if (el.uuid !== data.uuid) {
                  // console.log("We can push item");
                  AsyncStorage.setItem(
                    "account",
                    JSON.stringify([...accounts, data])
                  );
                }
              });
            }
          }
          setAwaiting(false);
          dispatch(setUser(data));
          dispatch(setAuthenticated(true));
          // Set logged in state and user to details
          Toast.show({
            type: "success",
            text1: "Login",
            text2: "You have signed in.",
          });
        })
        .catch((e) => {
          console.log("Error ", e);
          Toast.show({
            type: "error",
            text1: "Check your login details!",
          });
        });
    } else {
      // Alert Error for unfinished form data...
      Toast.show({
        type: "error",
        text1: "Please fill all required fields!",
      });
    }
  };

  useEffect(() => {
    // Wait for AsyncStorage to finish before rendering the lists account
    _retrieveData();
    // Google Auth
    if (response?.type === "success") {
      setAwaiting(true);
      // console.log("Google success ", response);
      // Use the access token from authentication to get the users details to store as a record or retrieve...
      // Which will be used throughout the app for user details
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.authentication.accessToken}`
        )
        .then(({ data }) => {
          // Check if an account exist with the given uuid which in this case will be sub key
          axios
            .post(`${ROOT_URL.api}/google`, {
              sub: data.sub,
              email: data.email,
              zip: "-----",
              name: data.name,
              profile_image_src: data.picture,
              uuid: data.sub,
              password: data.sub,
              phone: "--- --- ----",
            })
            .then(({ data }) => {
              setAwaiting(false);
              if (!data.error) {
                dispatch(setUser(data));
                dispatch(setAuthenticated(true));
              } else {
                Toast.show({
                  type: "error",
                  text1: "Could not authenticate!",
                });
              }
            });
        });

      // const { authentication } = response;
    }
  }, [loaded, response]);

  const show = () => {
    if (signup === 1) {
      return (
        <Layout>
          <Layout style={styles.backgroundImageContainer}>
            <Image
              style={styles.backgroundImage}
              source={require("../../assets/Group1.png")}
            />
          </Layout>

          <Text
            category="c2"
            style={{ paddingLeft: 10, marginTop: 20, color: "#301A4B" }}
          >
            WELCOME TO
          </Text>
          <Text
            category="h6"
            style={{
              fontWeight: "bold",
              paddingLeft: 10,
              color: "#301A4B",
              marginTop: 25,
              // marginBottom: 20,
            }}
          >
            Event Registration
          </Text>
          {loaded ? (
            <ScrollView style={styles.accountsContainer} horizontal={true}>
              {renderAccountsList()}
            </ScrollView>
          ) : (
            <Text></Text>
          )}
          <Input
            style={styles.input}
            value={email}
            label="E-mail"
            placeholder="Enter your email address"
            textContentType={"emailAddress"}
            clearButtonMode="always"
            returnKeyType="next"
            keyboardType={"email-address"}
            onChangeText={(newEmail) => setEmail(newEmail)}
            onBlur={onEmailBlur}
            status={emailError ? "success" : "danger"}
          />
          <Input
            style={styles.input}
            value={password}
            label="Password (at least 8 characters)"
            placeholder=""
            secureTextEntry={true}
            returnKeyType="next"
            onChangeText={(newPassword) => setPassword(newPassword)}
            onBlur={onPasswodBlur}
            status={passwordError ? "success" : "danger"}
          />

          <Button style={styles.button} size="medium" onPress={onLogin}>
            Let's Go!
          </Button>
          <Text
            style={{
              textAlign: "right",
              marginRight: 15,
              marginBottom: 25,
              color: "#0B2F8D",
              fontWeight: "bold",
            }}
            onPress={navigateForgotPassword}
          >
            Forgot Password?
          </Text>
          <Layout
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: 30,
              position: "relative",
            }}
          >
            <Divider />
            <Text
              style={{
                position: "absolute",
                top: -10,
                left: "45%",
                backgroundColor: "white",
                // padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              OR
            </Text>
          </Layout>
          <Button
            size="medium"
            appearance="outline"
            style={styles.buttonAlt}
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              source={require("../../assets/Google_Logo.png")}
              style={styles.tinyLogo}
            />
            {"   "}
            <Text style={{ fontWeight: "700", color: "#454545" }}>
              Log in with Google{" "}
            </Text>
          </Button>

          <Text style={styles.noaccount}>
            Don't have an account?
            <Text style={styles.signUp} onPress={navigateSignup}>
              {" "}
              Sign Up
            </Text>
          </Text>
        </Layout>
      );
    } else if (signup === 2) {
      return <SignupScreen />;
    } else {
      return <PasswordResetScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {awaiting ? (
        <Layout style={styles.spinnerContainer}>
          <Spinner />
        </Layout>
      ) : (
        <ScrollView style={styles.scrollView}>
          <Layout style={styles.container}>{show()}</Layout>
        </ScrollView>
      )}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 15,
    height: 15,
  },
  container: {
    flex: 1,
  },
  accountsContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F7F0FF",
  },
  accountItem: {
    backgroundColor: "white",
    padding: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E5E5",
  },
  accountName: {
    marginLeft: 10,
    fontWeight: "600",
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 5,
    // backgroundColor: "white",
    // borderColor: "#969595",
  },
  checkBox: {
    marginLeft: 15,
    marginBottom: 20,
  },

  button: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
    borderRadius: 25,
    marginTop: 15,
  },
  buttonAlt: {
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    borderColor: "#E4E4E4",
    borderRadius: 25,
  },
  noaccount: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  signUp: {
    fontWeight: "bold",
    color: "#0B2F8D",
    marginTop: 10,
  },
  backgroundImageContainer: {
    backgroundColor: "#F7F0FF",
    height: 250,
    margin: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: 220,
    height: 220,
    marginBottom: -30,
  },
  spinnerContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
