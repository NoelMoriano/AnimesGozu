import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import configs from "./configs.json";
import { includes } from "lodash";

const hostName = window.location.hostname;

const hostsProduction = ["aminegozu.com"];

const currentEnvironment = includes(hostsProduction, hostName)
  ? "production"
  : "development";

const currentConfig = configs[currentEnvironment];

firebase.initializeApp(currentConfig.firebaseApp);

const auth = firebase.auth();
const firestore = firebase.firestore();

const common = configs.common;
const contactData = configs.common.contactData;

const { version, animeServerApi } = currentConfig;

console.log(currentEnvironment, ":", version);

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
