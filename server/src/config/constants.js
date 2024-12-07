const API_URL = process.env.SERVER_URL;
const ClIENT_URL = process.env.ClIENT_URL;
const APP_NAME = process.env.APP_NAME;
const MAX_RESULTS = 10;
const DEFAULT_TIMEOUT = 5000;
const TOKEN_EXPIRES_IN = "1d";
const AlLOWED_ORIGINS = ["http://localhost:5500", "http://localhost:5173"];

const COOKIE_OPTIONS = {
  NAME: "refresh",
  OPTIONS: {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  },
};

const ADMIN_ROLES = [
  { text: "Super admin", value: "super-admin" },
  { text: "Sub admin", value: "sub-admin" },
  { text: "Users management", value: "users-mgt" },
  { text: "Email management", value: "email-mgt" },
];

module.exports = {
  API_URL,
  ClIENT_URL,
  MAX_RESULTS,
  DEFAULT_TIMEOUT,
  COOKIE_OPTIONS,
  CURRENCY: ["usd"],
  TRANSACTION: {
    TYPES: ["transfer", "funding"],
    STATUS: ["pending", "failed", "successful", "refunded"],
  },
  LOAN: {
    STATUS: ["pending", "approved", "rejected", "repaid"],
    SCHEDULE: ["monthly", "biweekly", "weekly", "annually"],
    TYPES: [
      "personal",
      "auto",
      "student",
      "mortgage",
      "home equity",
      "business",
      "others",
    ],
  },
  ADMIN_ROLES_VALUES: ADMIN_ROLES.map((role) => role.value),
  ADMIN_ROLES,
  USER: {
    GENDER: ["male", "female", "other"],
    EXCLUDES: ["password", "pin", "refreshToken", "userId"],
  },
  OTP_TYPES: [
    "email.verification",
    "password.recovery",
    "change.password",
    // "transaction.completion",
  ],
  OTP_TIMEOUT: 10, // min
  TOKEN_EXPIRES_IN,
  AlLOWED_ORIGINS,
};
