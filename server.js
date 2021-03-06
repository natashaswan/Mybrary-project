if (process.env.NODE_ENV !== "production") {
    require("dotenv").config() 
}

const express = require ("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")


const indexRouter = require("./routes/index")
//Author router
const authorRouter = require("./routes/authors")
//Book router
const bookRouter = require("./routes/books")

app.set("view engine", "ejs")
app.set("views", __dirname+"/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))
app.use(express.urlencoded ({limit: '10mb', extended: false}))
app.use(express.json());

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", ()=> console.log("Connected to Mongoose"))

app.use("/", indexRouter);
//Author route
app.use("/authors", authorRouter);
//Book route
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000);
