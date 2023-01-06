const express = require("express");
const path = require("path")
const fs = require("fs")
const bodyparser = require("body-parser")
const app = express();

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Dance_Contact');
  
}



const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    phone: String,
    address: String,
  });

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))

app.use(express.urlencoded())

app.set('view engine' , 'pug')

app.set('views', path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    
    const param = {};
    res.status(200).render('home.pug',param);    
})
app.get('/contact',(req,res)=>{
    
    const param = {};
    res.status(200).render('contact.pug',param);    
})
app.post('/contact',(req,res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("The data has been Submitted Successfully")
    }).catch(()=>{
        res.status(404).send("The item has not been Submitted")
    });
    // res.status(200).render('contact.pug');    
})




app.listen(port , ()=>{
    console.log(`The application has started successfully on port ${port}`);
})