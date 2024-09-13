const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))

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
    res.render('maker/id', {character})
})


app.get('/maker/:id/edit', (req, res) => {
    const { id } = req.params;
    const character = characters.find(c => c.id === id);
    res.render('maker/edit', { character });
})

app.patch('/maker/:id', (req, res) => {
    // res.send("Updating somthing")
    console.log(req.params.id)
    const { id } = req.params;
    console.log(req.body)
    // res.send("ALL GOOD!")
    //name, attack, defense, health, description
    const newName = req.body.name;
    const newAttack = req.body.attack;
    const newDefense = req.body.defense;
    const newHealth = req.body.health;
    const newDescription = req.body.description;


    const foundCharacter = characters.find(c => c.id === id);


    foundCharacter.name = newName;
    foundCharacter.attack = newAttack;
    foundCharacter.defense = newDefense;
    foundCharacter.health = newHealth;
    foundCharacter.description = newDescription;

    res.redirect(id);
})

app.delete('/maker/:id', (req, res) => {
    const { id } = req.params;
    characters = characters.filter(c => c.id !== id);
    res.redirect('/maker');
})



app.listen(3000, () =>{
    console.log('Listening to port 3000')
})


