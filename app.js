const express = require('express')
const app = express();
const fs = require('fs')

const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({extended:false}))

app.get('/',(req,res) => {
    fs.readFile('username.txt',(err,data) => {
        if(err){
            console.log(error)
            data = 'no chat exist'
        }
    res.send(
        `${data}<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('usrername')"
        method="POST">
        <input id="message" type="text" placeholder="message">
        <input type="hidden" name="username" id="username">
        <button type="submit">send</button>
        </form>`
        )
    })
})
app.post('/',(req,res) => {
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt",`${req.body.username}:${req.body.message}`,{flag:'a'},(err) => {
        err ? console.log(err) : res.redirect("/")
    })
    res.redirect('/')
})

app.get("/login",(req,res) => {
   res.send(
    `<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('usrername')"method="POST">
    <input id="username" type="text" name="username" placeholder="username">
    <button type="submit">send</button>
    </form>`
)
})

app.post("/login",(req,res) => {
    console.log(req.body.username)
    fs.writeFile("username.txt",`${req.body.username}`,{flag:'a'},(err) => {
        err ? console.log(err) : res.redirect("/")
    })
    res.redirect('/')
})

app.listen(3000)