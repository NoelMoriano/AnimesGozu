import React, { useEffect } from "react";
import { get, isEmpty, isString, toNumber } from "lodash";

export const useFormUtils = ({ errors, schema }) => {
  useEffect(() => {
    !isEmpty(errors) && scrollIntoError();
  }, [errors]);

  const scrollIntoError = () => {
    const formItemErrors = document.getElementsByClassName(
      "scroll-error-anchor"
    );

    formItemErrors.length &&
      formItemErrors[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  const eventInputNumber = (e) => {
    const { value } = e.target;

    if (toNumber(value) < 0) {
      const removeSymbol = value.slice(1);

      return toNumber(removeSymbol);
    }

    return value ? toNumber(value) : null;
  };

  const errorMessage = (name) => {
    const message = errors && errors[name]?.message;

    return isString(message) ? message : undefined;
  };

  const error = (name) => !!(errors && errors[name]);

  const required = (name) => {
    const describe = schema.describe();

    const describePath = [];

    name.split(".").forEach((fieldName) => {
      describePath.push("fields");
      describePath.push(fieldName);
    });

    describePath.push("tests");

    const tests = get(describe, describePath, []);

    return tests.some((test) => test.name === "required");
  };

  const eventCheckbox = (e) => e.target.checked;

  return { error, errorMessage, required, eventInputNumber, eventCheckbox };
};
