



'use strict'
const express = require('express') 
const server = express() 
const cors = require('cors');
require('dotenv').config();
const PORT=process.env.PORT;
const weather=require('./data/weather.json');
server.use(cors());




server.listen(PORT,()=>{
  console.log(`server runs in port ${PORT}`) 
}) 


server.get('/',(req,res)=>{
  res.send('hello world')
})

server.get('/weather',(req,res)=>{               
  res.send(weather)
}); 



server.get('/weather/:lon/:lat/:city_name',(req,res)=>{
  const data= weather.find((element)=>+element.lon === +req.params.lon &&
  +element.lat === +req.params.lat &&
  element.city_name === req.params.city_name);
  
  if(data){
      res.send(data)
  }else
  {res.send('try another city')}
    
  
});

server.get('/weather/:city_name',(req,res)=>{
  let newWeather=[];
  const findCity=weather.find((element)=>element.city_name === req.params.city_name);
  if(findCity){
    findCity.data.map((day)=>newWeather.push(new Forecast(day)));
    res.send(newWeather);
    
  }else{
    res.status.send('the location  NOT  found');
  }
})


class Forecast {
  constructor(city) {
      this.date = city.datetime;
      this.description = city.weather.description
  }
};


