export const promisedSetState = (newState, _this) =>
  new Promise((resolve) => _this.setState(newState, () => resolve()));

export const timeoutPromise = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
