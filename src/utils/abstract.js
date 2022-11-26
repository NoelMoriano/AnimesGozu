import { removeAccents } from "./removeAcents";
import { toLower } from "lodash";

export const formatWord = (word = "") => removeAccents(toLower(word));
export const formatWords = (words = []) =>
  words.map((word) => removeAccents(toLower(word)));
