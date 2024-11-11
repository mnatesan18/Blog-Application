import express from "express";
import bodyParser from 'body-parser';
const app=express();
const PORT=3000;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
let posts=[];
app.listen(PORT,()=>console.log(`server is running on ${PORT}`));
app.get('/',(req,res)=>{
    res.render('home',{posts});
})
app.get('/create',(req,res)=>{
    res.render('create');
})
app.post('/create',(req,res)=>{
    const {title,content}=req.body;
    const newPost={id:Date.now(),title,content};
    posts.push(newPost);
    res.redirect('/');
})
// Edit Route
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post });
  });
  
  app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id == req.params.id);
    post.title = title;
    post.content = content;
    res.redirect('/');
  });
  
  // Delete Route
  app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
  });
  