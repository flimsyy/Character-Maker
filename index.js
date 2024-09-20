// Import required modules
const express = require('express'); // Web framework for Node.js
const app = express(); // Create an Express application
const path = require('path'); // Module for handling file paths
const methodOverride = require('method-override'); // Middleware for supporting HTTP methods

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Import UUID for generating unique IDs
const { v4: uuid } = require('uuid');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware for overriding HTTP methods (for PUT/PATCH/DELETE)
app.use(methodOverride('_method'));

// Set the view engine to EJS and define the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Initial array of characters with unique IDs and attributes
let characters = [
    { id: uuid(), name: 'Mary', attack: 10, defense: 20, health: 20, description: 'I am a default female' },
    // ... other characters
];

// Route to display the character maker page with all characters
app.get('/maker', (req, res) => {
    res.render('maker', { characters });
});

// Route to show the form for creating a new character
app.get('/maker/new', (req, res) => {
    res.render('maker/new');
});

// Route to handle new character creation
app.post('/maker', (req, res) => {
    const { name, attack, defense, health, description } = req.body; // Destructure input values
    characters.push({ name, attack, id: uuid(), defense, health, description }); // Add new character
    res.redirect('maker'); // Redirect to the character maker page
});

// Route to display details of a specific character
app.get('/maker/:id', (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    const character = characters.find(c => c.id === id); // Find the character by ID
    res.render('maker/id', { character }); // Render the character detail page
});

// Route to show the edit form for a specific character
app.get('/maker/:id/edit', (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    const character = characters.find(c => c.id === id); // Find the character by ID
    res.render('maker/edit', { character }); // Render the edit form
});

// Route to handle character updates
app.patch('/maker/:id', (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    const foundCharacter = characters.find(c => c.id === id); // Find the character
    // Update character attributes with new values
    foundCharacter.name = req.body.name;
    foundCharacter.attack = req.body.attack;
    foundCharacter.defense = req.body.defense;
    foundCharacter.health = req.body.health;
    foundCharacter.description = req.body.description;
    res.redirect(id); // Redirect to the updated character's detail page
});

// Route to delete a character
app.delete('/maker/:id', (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    characters = characters.filter(c => c.id !== id); // Remove character from the array
    res.redirect('/maker'); // Redirect to the character maker page
});

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Listening to port 8080');
});
