import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import configs from "./configs.json";
import { includes } from "lodash";

const hostName = window.location.hostname;

const hostsProduction = ["animes-362103.web.app", "animesgozu.com"];

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
