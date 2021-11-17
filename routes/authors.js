const express = require("express")
const router = express.Router()
const Author = require("../models/author")
const bodyParser = require("body-parser")

//All Authors Router with search
router.get("/", async (req, res) => {
    let searchAuthor = {}
    if (req.query.name != null && req.query.name !== ""){
        searchAuthor.name = new RegExp(req.query.name, "i")
    }
    try {
        const authors = await Author.find(searchAuthor)
        res.render("authors/index", {
            authors: authors, 
            searchAuthor: req.query}) 
        } catch {
        res.redirect("/")
    }
    
})

// New Author Route
router.get("/new", (req, res) => {
    res.render("authors/new", { author: new Author() })
})

//Create Author Route with create
router.post("/", async (req, res) => {
    const author = new Author({ 
        name: req.body.name 
    })   
    try {
        const newAuthor = author.save()
        //res.render("authors/${newAuthor.id})
        res.redirect("authors")
    } catch {
        res.render("authors/new", {
            author: author,
            errorMessage: "Error creating a new Author"
        })
    }
 })

module.exports = router