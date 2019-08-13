const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const items = require("./routes/api/items");

const app = express();

// body parsr middleware
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;
// connect to DB
mongoose
  .connect(db)
  .then(() => console.log("mongo Db conneted"))
  .catch(err => console.log(err));

//use routes
app.use("/api/items", items);

// serve static assests if in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
