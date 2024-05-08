const express = require('express') ;
const { times, result, extend } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose');


const BlogRoutes = require('./route/BlogRoutes');

const app = express()

// connect to mongo db

//const dbURI = 'mongodb+srv://rayyy:rayy123@cluster0.s7spgt9.mongodb.net/node-study?retryWrites=true&w=majority&appName=Cluster0';

const dbURI = 'mongodb+srv://rayyy:rayy123@cluster0.s7spgt9.mongodb.net/node-study?retryWrites=true&w=majority'

mongoose.connect(dbURI)
   .then((result) => app.listen(3000) )
   .catch((err) => console.log('err') ) ;

// register view engine

app.set('view engine' , 'ejs')




//middleware and static file //  so that we can access files fro anywhere
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})) ;
app.use(morgan('dev'));

app.use( (req,res,next)=>{
    console.log('new request made: ');
    console.log('host: ' , req.hostname);
    console.log('path: ' , req.path);
    console.log('method ', req.method);
    next();
});

// routes

app.get('/' , (req, res)=>{
    res.redirect('/blogs');
}) ;

app.use( (req,res,next)=>{
    console.log('in the next middleware ');
    next();
});


app.get('/about' , (req, res)=>{
    // res.send('<p> about page loaded</p>') ;

    res.render('about', {title: 'About'});
}) ;

// redirect 

app.get('/about-me' , (req, res)=>{
   
    res.redirect('/about')
}) ;


// blog routes

app.use('/blogs' , BlogRoutes);

// 404

app.use((req,res) => {
    res.status(404).render('404' , {title: '404'})
})

