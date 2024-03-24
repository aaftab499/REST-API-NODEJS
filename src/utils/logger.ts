import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
	level: 'info',
	format: combine(
		label({ label: "rest-api-node" }),
		timestamp(),
		myFormat
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: "application.log" }),
	],
});

export default logger;
