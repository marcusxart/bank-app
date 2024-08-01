const API_URL = process.env.SERVER_URL;
const MAX_RESULTS = 10;
const DEFAULT_TIMEOUT = 5000;
const TOKEN_EXPIRES_IN = "1d";
const AlLOWED_ORIGINS = ["http://localhost:5500", "http://localhost:5173"];

const COOKIE_OPTIONS = {
  NAME: "refresh",
  OPTIONS: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  },
};

const ADMIN_ROLES = [
  { text: "Super Admin", value: "super-admin" },
  { text: "Sub Admin", value: "sub-admin" },
  { text: "Users Management", value: "users-mgt" },
  { text: "Email Management", value: "email-mgt" },
];

module.exports = {
  API_URL,
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
