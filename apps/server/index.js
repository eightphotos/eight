import express from 'express';

const app = express();
const PORT = process.env.PORT || 1284;

// Middleware to parse JSON bodies
app.use(express.json());    

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

app.use((req, res, next) => {   
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}); 

   

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
}); 

app.listen(PORT, () => {    
    console.log(`Server is running on http://localhost:${PORT}`);
});
