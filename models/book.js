const mongoose = require("mongoose")
const coverImageBasePath = "public/uploads/bookCovers"
const path = require("path")
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    pageCount: {
        type: Number,
        required: true
    },

    description: {
        type: String,
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

    publishDate: {
        type: Date,
        required: true
    },

    coverImageName: {
        type: String,
        required: true
    },
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    }

})

bookSchema.virtual("coverImagePath").get(function(){
    if (this.coverImageName != null) {
        return path.join("/", coverImageBasePath, this.coverImageName)
    }
})


module.exports = mongoose.model("Book", bookSchema)
module.exports.coverImageBasePath = coverImageBasePath