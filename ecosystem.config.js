module.exports = {
  apps: [
    {
      name: "dcbot",
      script: "node --env-file=.env ./src/dist/app.js",
    },
  ],
};
