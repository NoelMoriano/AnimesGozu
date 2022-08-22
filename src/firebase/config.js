import firebase from "firebase";
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

const common = configs.common;
const contactData = configs.common.contactData;

const { version, animeServerApi } = currentConfig;

console.log(currentEnvironment, ":", version);

export {
  firebase,
  version,
  animeServerApi,
  currentConfig,
  common,
  contactData,
  auth,
};
