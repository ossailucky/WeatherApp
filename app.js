import express from "express";
import https from "https"
import bodyParser from "body-parser";
import path from "path";
//import { dirname } from "path";

 
const app = express()

const __dirname = path.resolve();


 app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
    
 })

 //app.use(express.static("./public"))

app.post("/", (req,res)=>{

    
     
     const query = req.body.cityName;
     const apiKey = "125f7397e6fcc7cfbc31727a530344c9";
     const unit = "metric";
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
     https.get(url,(response)=>{
         response.on("data", (data)=>{
             const weatherData = JSON.parse(data)
             const temp = weatherData.main.temp
             const weatherDescription = weatherData.weather[0].description
             const weatherIcon = weatherData.weather[0].icon
             const imageUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
             res.write(`<h1>The Temperature in ${query}  is ${temp} degrees Celcius</h1>.`)
             res.write(`<p>The Weather is current ${weatherDescription}</p>`)
             res.write(`<img src=${imageUrl}>`)
             
         })
         
     })
     
     
    
})

app.listen(3000,()=>{
    console.log("Server has started listen")
})