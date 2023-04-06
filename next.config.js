
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');


module.exports = (phase) => {

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "anilcelik075",
        mongodb_password: "x4NfcEB6mz5BZGeE",
        mongodb_clusterName: "cluster0",
        mongodb_database: "auth",
        NEXTAUTH_SECRET: "thequickbrownfox",
      },
    };
  }

  return {
    env: {
      mongodb_username: "anilcelik075",
      mongodb_password: "x4NfcEB6mz5BZGeE",
      mongodb_clusterName: "cluster0",
      mongodb_database: "auth-prod",
      NEXTAUTH_SECRET: "thequickbrownfox",
    },
  };
};
