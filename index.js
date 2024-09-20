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
    ,
    {
        id: uuid(),
        name: 'Lucy',
        attack: 15,
        defense: 15,
        health: 25,
        description: 'I am a balanced fighter'
    },
    {
        id: uuid(),
        name: 'John',
        attack: 25,
        defense: 5,
        health: 30,
        description: 'I am a strong attacker'
    },
    {
        id: uuid(),
        name: 'Sophia',
        attack: 18,
        defense: 12,
        health: 22,
        description: 'I am a quick and agile fighter'
    },
    {
        id: uuid(),
        name: 'Daniel',
        attack: 12,
        defense: 18,
        health: 28,
        description: 'I rely on defense'
    },
    {
        id: uuid(),
        name: 'Emma',
        attack: 22,
        defense: 8,
        health: 26,
        description: 'I am a fast striker'
    },
    {
        id: uuid(),
        name: 'Michael',
        attack: 10,
        defense: 20,
        health: 20,
        description: 'I prioritize defense over attack'
    },
    {
        id: uuid(),
        name: 'Olivia',
        attack: 20,
        defense: 10,
        health: 25,
        description: 'I balance attack and health'
    },
    {
        id: uuid(),
        name: 'David',
        attack: 17,
        defense: 13,
        health: 22,
        description: 'I have balanced stats overall'
    },
    {
        id: uuid(),
        name: 'Chloe',
        attack: 14,
        defense: 16,
        health: 24,
        description: 'I am a defensive fighter'
    },
    {
        id: uuid(),
        name: 'Joshua',
        attack: 28,
        defense: 7,
        health: 20,
        description: 'I have high attack but low defense'
    },
    {
        id: uuid(),
        name: 'Ava',
        attack: 16,
        defense: 14,
        health: 26,
        description: 'I am versatile in both attack and defense'
    },
    {
        id: uuid(),
        name: 'Liam',
        attack: 20,
        defense: 12,
        health: 18,
        description: 'I strike fast and defend just enough'
    },
    {
        id: uuid(),
        name: 'Grace',
        attack: 18,
        defense: 15,
        health: 21,
        description: 'I focus on balance in fights'
    },
    {
        id: uuid(),
        name: 'Ethan',
        attack: 24,
        defense: 9,
        health: 23,
        description: 'I prefer high attack with average health'
    },
    {
        id: uuid(),
        name: 'Isabella',
        attack: 13,
        defense: 17,
        health: 27,
        description: 'I am focused on defense and stamina'
    },
    {
        id: uuid(),
        name: 'Lucas',
        attack: 21,
        defense: 12,
        health: 22,
        description: 'I am an offensive fighter with decent defense'
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



app.listen(8080, () =>{
    console.log('Listening to port 3000')
})


