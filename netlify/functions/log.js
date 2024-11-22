const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    const logFilePath = path.join("/tmp", "logs.txt");

    if (event.httpMethod === "POST") {
      const { message, level } = JSON.parse(event.body || "{}");
      const logEntry = `[${new Date().toISOString()}] [${level || "info"}]: ${message}\n`;
      fs.appendFileSync(logFilePath, logEntry);
    }

    const logs = fs.existsSync(logFilePath)
      ? fs.readFileSync(logFilePath, "utf8")
      : "No logs available.";

    return {
      statusCode: 200,
      body: JSON.stringify({ logs }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
