const mongoose = require('mongoose')
const Character = require('./models/Character')

mongoose.connect("mongodb+srv://Mycko:645n4YH3NXpBfl1F@cluster0.nfll3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log('Connected to MongoDB')).catch((err)=>{'Connection error', err})

const characterData = [
  {
    name: "Aragorn",
    attack: 85,
    defense: 70,
    health: 100,
    description: "A skilled warrior with unmatched courage.",
  },
  {
    name: "Gandalf",
    attack: 95,
    defense: 60,
    health: 80,
    description: "A wise wizard with powerful magic.",
  },
  {
    name: "Legolas",
    attack: 80,
    defense: 60,
    health: 90,
    description: "An agile archer with keen senses.",
  },
  {
    name: "Frodo",
    attack: 40,
    defense: 30,
    health: 60,
    description: "A hobbit with a resilient spirit.",
  },
  {
    name: "Sauron",
    attack: 100,
    defense: 90,
    health: 100,
    description: "A dark lord with immense power.",
  },
];

async function seedDatabase(){
  try{
    const insertedCharacters = await Character.insertMany(characterData)
    console.log('Database was seeded sucessfully', insertedCharacters)
  } catch(error){
    console.log('Error when seeding the database', error)
  }
}

seedDatabase()