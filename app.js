const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate=require("ejs-mate");

const Listing = require("./models/listing.js");
const methodOverride=require("method-override");
// for database connectivity 
const Mongo_URL = "mongodb+srv://sainisujata303:YnMDvFfotpLzOpDw@airbnbcluster.nzia8nh.mongodb.net/?retryWrites=true&w=majority&appName=AirbnbCluster";

// call the db using main function 
main().then(()=>{
    console.log("Connected to DataBase");
}).catch(err=>{
    console.log(err);
})
//db url 
async function main(){
    await mongoose.connect(Mongo_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs',ejsMate);
// // code to start the server 
// app.get("/", (req,res)=>{
//     res.send("Hi , I am your travel partner");
// });
app.get("/", (req, res) => {
    res.render("home");  // renders views/home.ejs
});

// index route 

app.get("/listings", async(req,res)=>{
   const allListings = await  Listing.find({});
   res.render("listings/index", { allListings });

});
   //new route 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");

})
// Show route - GET /listings/:id
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  });
  

 
// Update route - PUT /listings/:id
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  });
  
//    res.render("/listings/index.ejs", {allListings});
//    .then((res) =>{
//         console.log(res);
//     }) 
 

//create route 
app.post("/listings",async(req,res)=>{
    console.log("Received Form Data:", req.body);

const  newListing= new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");
});

//edit routes

app.get("/listings/:id/edit", async (req,res)=>{
    let {id}= req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

// delete route
app.delete("/listings/:id", async(req,res)=>{
    // let { id }= req.params;
    let id = req.params.id.trim();  
let deletedListing= await Listing.findByIdAndDelete(id);
console.log(deletedListing);
res.redirect("/listings");
});


// app.get("/testListing", async (req,res)=>{
//   let sampleListing = new Listing ({
//     title: "My new villa ",
//     description:"By the beach",
//     price:12000,
//     location:"Calangute,Goa",
//     country:"India",
//   })

//   await sampleListing.save();
//   console.log("Sample saved Successfully ");
//   res.send("Successful testing ");
// })
app.listen(8080, ()=>{

    console.log("Server is listening to port 8080")
})