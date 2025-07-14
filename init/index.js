const mongoose = require("mongoose");
const initData  = require("./data.js");
const Listing = require("../models/listing.js");
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
const initDb = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDb();
