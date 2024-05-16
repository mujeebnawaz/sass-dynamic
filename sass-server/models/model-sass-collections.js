const { MongoClient }  = require('mongodb');

const connectd = async ( connectionPath ) => {
  const url = connectionPath;

  try {
    const client = new MongoClient( url );
    await client.connect();
    // Return the database object. 
    return client.db(); 
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

// Define the SassFile schema
const sassFileSchema = {
    filename: {
        type: String,
        required: true,
        unique: true
    },
    css: {
        type: String,
        required: true
    },
    generatedAt: {
        type: Date,
        default: Date.now
    }
};

// Export the SassFile schema
module.exports = { sassFileSchema, connectd };
