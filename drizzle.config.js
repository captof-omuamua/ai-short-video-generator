
/** @type {import("drizzle-kit").Config} */
export default ({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url:'REDACTED_CONFIGURE_WITH_ENVIRONMENT_VARIABLE'

  }
});
