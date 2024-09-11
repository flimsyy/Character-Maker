const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

const { v4: uuid } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


let characters = [
    {
        id: uuid(),
        name: 'Mary',
        attack: 10,
        defense: 20,
        health: 20,
        description: 'I am a default female'
    }
    ,
    {
        id: uuid(),
        name: 'James',
        attack: 20,
        defense: 10,
        health: 20,
        description: 'I am a default male'
    }
]


app.get('/maker', (req,res) => {
    res.render('maker', {characters})
})

app.get('/maker/new', (req,res) => {
    res.render('maker/new')
})

app.post('/maker', (req, res) => {
    
    const {name, attack, defense, health, description} = req.body;
    characters.push({ name, attack, id: uuid(), defense, health, description });
    res.redirect('maker')
    
    
})

app.get('/maker/:id',(req,res) => {
    let { id } = req.params;
    const character = characters.find(c => c.id === id);
    console.log(character)
    res.render('maker/id', {character})
})




app.listen(3000, () =>{
    console.log('Listening to port 3000')
})


