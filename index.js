const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { createPollGet, createPoll, getAllPolls, getViewPoll, createOpinionViewPoll } = require("./pollController")
require("ejs")
require("dotenv").config()

const app = express()
const databaseUrl = process.env.MONGODB_URL;
const port = process.env.PORT
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
 res.render("home")
})

app.get("/create", createPollGet)
app.post("/create", createPoll)
app.get("/polls", getAllPolls)
app.get("/polls/:id", getViewPoll)
app.post("/polls/:id", createOpinionViewPoll)



const DBconnect = async () => {
   try {
    await mongoose.connect(databaseUrl, { });
    console.log("data base connect successfully Done")

      mongoose.connection.on("error", () => {
        console.log("error", "database connection error", error);
      });
   } catch (error) {
    console.log("error", "could not connection Database", error);
   }
}

app.listen(port, () => {
  console.log(
    `Sever is running at http://localhost:${port}`
  );
  DBconnect();
});