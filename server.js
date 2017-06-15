const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
var app = express();

const port = (process.env.PORT || 3000);

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs')
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err) => {
    if (err){
      console.log('Unable to append to server.log');
    }
  })
  next();
});

// app.use((req,res, next)=>{
//   res.render('maintainance',{
//     pageTitle: 'Maintainance Page',
//     maintainanceMessage: 'This site is under maintainance, we will be back soon.'
//   })
// })

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})

//Root route
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>')

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello World',
    })
});
//About Site
app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
})
//Response with Errormessage
app.get('/bad', (req, res) =>{
  res.send({
    errorCode: 666,
    errorMessage: 'You messed with the wrong route'
  })
})

app.listen(port, () => {
  console.log(`Sever is up on port ${port}`);
})
