const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")

dotenv.config()

const app=express()

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Start on port  :${PORT}`));

const userRouter=require("./routes/userroute")

app.use(express.json());
app.use(cors());

//Mongoose connection mongodb connection
mongoose.connect(
    process.env.MDB_CONNECT,  
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) return console.error(err);
      console.log("Connect to Mongodb server");
    }
  );


  app.use("/",userRouter)


// app.use(express.json({limit:"30mb",extended:"true"}))
// app.use(express.urlencoded({limit:"30mb",extended:"true"}))
// app.use(cors());




 //Router
 




  //set router
  


