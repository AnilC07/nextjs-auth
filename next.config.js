const PHASE_DEVELOPMENT_SERVER = require("next/constants");

module.exports = (phase) => {
  if (!PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "anilcelik075",
        mongodb_password: "x4NfcEB6mz5BZGeE",
        mongodb_clusterName: "cluster0",
        mongodb_database: "auth-prod",
        
      },
    };
  }else{
    return {
      env: {
        mongodb_username: "anilcelik075",
        mongodb_password: "x4NfcEB6mz5BZGeE",
        mongodb_clusterName: "cluster0",
        mongodb_database: "auth",
      },
    };
  }
};
