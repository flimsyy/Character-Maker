// Import required modules
const express = require('express'); // Web framework for Node.js
const app = express(); // Create an Express application
const path = require('path'); // Module for handling file paths
const methodOverride = require('method-override'); // Middleware for supporting HTTP methods

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose')
// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware for overriding HTTP methods (for PUT/PATCH/DELETE)
app.use(methodOverride('_method'));

// Set the view engine to EJS and define the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const Character = require('./models/Character')

mongoose.connect("mongodb+srv://Mycko:645n4YH3NXpBfl1F@cluster0.nfll3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log('Connected to MongoDB')).catch((err)=>{'Connection error', err})

// Route to display the character maker page with all characters
app.get('/maker', async (req, res) => {
    let characters = await Character.find()
    res.render('maker', { characters });
});

// Route to show the form for creating a new character
app.get('/maker/new', async (req, res) => {
    res.render('maker/new');
});

// Route to handle new character creation
app.post('/maker', async (req, res) => {
    const { name, attack, defense, health, description } = req.body; // Destructure input values
    await Character.create({ name, attack, defense, health, description }); // Add new character
    res.redirect('maker'); // Redirect to the character maker page
});

// Route to display details of a specific character
app.get('/maker/:id', async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    const character = await Character.findById(id)
    res.render('maker/id', { character }); // Render the character detail page
});

// Route to show the edit form for a specific character
app.get('/maker/:id/edit', async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    const character = await Character.findById(id)
    res.render('maker/edit', { character }); // Render the edit form
});

// Route to handle character updates
app.patch('/maker/:id', async (req, res) => {
    console.log("Updating...")
    const { id } = req.params; // Extract ID from request parameters
    const foundCharacter = await Character.findById(id) // Find the character

    

    await Character.findOneAndUpdate(foundCharacter._id, { $set: { name: req.body.name }})
    await Character.findOneAndUpdate(foundCharacter._id, { $set: { attack: req.body.attack }})
    await Character.findOneAndUpdate(foundCharacter._id, { $set: { defense: req.body.defense }})
    await Character.findOneAndUpdate(foundCharacter._id, { $set: { health: req.body.health }})
    await Character.findOneAndUpdate(foundCharacter._id, { $set: { description: req.body.description }})
    res.redirect(id); // Redirect to the updated character's detail page
});

// Route to delete a character
app.delete('/maker/:id', async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    const foundCharacter = await Character.findById(id) // Find the character

    await Character.deleteOne(foundCharacter._id)
    res.redirect('/maker'); // Redirect to the character maker page
});

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Listening to port 8080');
});
