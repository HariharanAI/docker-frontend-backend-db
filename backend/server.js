const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const port = 3004;
const routes = require("./routes");

main().catch((err) => console.log(err));

async function main() {
  // Correct MongoDB URI format: Add ':' between password and port
  await mongoose.connect("mongodb://13.91.42.113:27017/", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true  // Uncomment if needed for older versions of mongoose
  });
  
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}
