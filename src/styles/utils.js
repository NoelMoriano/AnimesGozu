// type Args = Record<string, unknown>[];

export const classNames = (...args) =>
  args
    .map((arg) =>
      typeof arg === "object"
        ? Object.entries(arg)
            .filter(([, condition]) => condition)
            .map(([className]) => className)
            .join(" ")
        : arg
    )
    .join(" ");
