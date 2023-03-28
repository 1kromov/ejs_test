const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const { title } = require("process");
const { default: axios } = require("axios");
const methodOverride = require("method-override");
dotenv.config()
const {} =require("./helpers/create_view_path")
const userRoute = require("./routes/users")

const createViewPath = (page)=> 
        path.resolve(__dirname,"views",`${page}.ejs`);

const myLogger = function(req,res,next){
    console.log("LOGGED");
    next();
};

const app = express()

app.set("view engine","ejs");

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server ishga tushdi:http://localhost:${PORT}`);
});

app.get("/",(req,res)=>{
    
    res.render(createViewPath("index"),{title:"Foydalanuvchi",page_name:"home"})
});
app.use(myLogger);
app.use(express.static("styles"));
app.use(express.static("img"));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(userRoute);


app.get("/gallery",(req,res)=>{
    const jpgs = ["123.jpg","bill.jpg","steve.jpg"]
    res.render(createViewPath("gallery"),{title:"Rasmlar",jpgs,page_name:"gallery"})
});

app.get("/jobs",(req,res)=>{
    const jobs = ["Go",".Net","FullStack","Flutter"]
    res.render(createViewPath("jobs"),{title:"Bajarilgan ishlar",jobs,page_name:"jobs"})
});
app.use(
    morgan(":method :url :status :res[content-length]-:response-time ms")
);

app.get("/contacts",(req,res)=>{
    const contacts = [
        {name:"telegramm", nik:"Ikramovv_A",link:"https://t.me/Ikramovv_A"},
        {name:"instagramm",nik:"1_ikromovv",link:"https://instagram.com/1_ikramovv_?igshid=YmMyMTA2M2Y="},
        {name:"facebook",nik:"Abdulaziz Ikromov",link:"https://www.facebook.com/profile.php?id=100069323370597"},
    ]
    res.render(createViewPath("contacts"),{title:"Boglanish uchun",contacts,page_name:"contacts"})
});

app.get((req,res)=>{ 
    res
    // .status(404)
    .render(createViewPath("error"),{title:"Xatolik",page_name:"error"})
});