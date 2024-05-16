/**
 * This is the dedicated file for server configuration. 
 * 
 */
const express = require( 'express' );
const routes  = require( './routes' );

const server = express();

// Middleware to set CORS headers
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow the HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow the headers

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

server.use( express.json() );

server.use( routes );

// Default Port
let port = 3005;

if( process.env.PORT ){
    port = process.env.PORT;
}

server.listen( port, () => {
    console.log( 'Server is running on http://localhost:'+port );
});