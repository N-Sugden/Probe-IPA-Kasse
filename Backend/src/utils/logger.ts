export enum LogLevel {
  INFO = "Info",
  WARNING = "Warning",
  ERROR = "Error"
}

export function log(
  level: LogLevel,
  message: string,
  context?: string
) {
  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
  const contextPart = context ? ` ${context}` : "";

  console.log(`[${level}] ${message}${contextPart} at ${timestamp}`);
}
