const app = require("./app");
const seed = require("./src/dbservices/seeder");
const db = require("./src/models");
const PORT = process.env.PORT || 3004;
// app.listen(PORT, () => console.log(`Listening on: 3004`));

db.sequelize
  .sync()
  .then(async () => {
    console.log("sequelize...");
    app.listen(PORT, async () => {
      // seed();
      console.log(`Dev Backend Listening on: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
