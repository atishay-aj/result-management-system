const express = require("express");
//express app
const app = express();

const port = process.env.PORT || 3000;
const mongoose = require('mongoose'); //to connect to mongodb

//connect to mongodb and listen to requests
mongoose.connect("mongodb+srv://atishay:1oWQv4hDce95Xgnd@resultmanagementsystem.ikvlmq5.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

//register view engine
app.set('view engine', 'ejs');
//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout');

//teacher and student routes
const teacherRoutes = require("./routes/teacherRoutes")
const studentRoutes = require("./routes/studentRoutes")
app.use("/teacher",teacherRoutes);
app.use("/student",studentRoutes);

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});