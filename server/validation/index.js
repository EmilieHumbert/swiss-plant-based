import Ajv from "ajv";
import addFormats from "ajv-formats";

const schema = require("../schemas/user.json");
const ajv = new Ajv();
addFormats(ajv);

export const validateUser = ajv.compile(schema);
