const phase_development_server = require("next/constants");


module.exports = (phase) => {
  console.log(phase);
  if (phase == phase_development_server) {
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
      NEXTAUTH_URL: "https://nextjs-auth-cgi.vercel.app/auth",
    },
  };
};
