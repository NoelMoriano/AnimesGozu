import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import configs from "./configs.json";
import { includes } from "lodash";

const hostName = window.location.hostname;

const hostsProduction = ["aminegozu.com"];

const currentEnvironment = includes(hostsProduction, hostName)
  ? "production"
  : "development";

const currentConfig = configs[currentEnvironment];

firebase.initializeApp(currentConfig.firebaseApp);

const firestore = firebase.firestore();
const auth = firebase.auth();

const common = configs.common;
const contactData = configs.common.contactData;

const { version, animeServerApi } = currentConfig;

console.log(currentEnvironment, ":", version);

let pageLoaded = false;
firestore.doc("settings/default").onSnapshot(() => {
  pageLoaded && document.location.reload();
  pageLoaded = true;
});

console.log("currentConfig->", currentConfig);

export {
  currentConfig,
  firebase,
  version,
  animeServerApi,
  common,
  contactData,
  auth,
  firestore,
};
