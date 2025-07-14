const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DEFAULT_IMAGE = {
    fileName: "defaultImage",
    url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };
  
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
    },
    image: {
        type: {
          fileName: String,
          url: String,
        },
        default: DEFAULT_IMAGE,
        set: (v) => {
          if (!v || typeof v !== 'object' || !v.url || v.url === "") {
            return DEFAULT_IMAGE;
          }
          return v;
        }},

    price: Number,
    location: String,
    country: String

});



const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing;