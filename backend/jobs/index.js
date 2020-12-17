const mongoose = require("mongoose");

const deleteInactiveUsers = require("./deleteInactiveUsers");
const deletePublicPages = require("./deletePublicPages");

const executeJobs = async () => {
  console.log("Setup database connection");
  mongoose
    .connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(async () => {
      console.log("SUCCESS - Database connected.");

      // Running jobs
      await deleteInactiveUsers();
      await deletePublicPages();

      process.exit();
    })
    .catch((err) => {
      console.log(`ERROR - While connected to database: ${err.message}`);
    });
};

executeJobs();
