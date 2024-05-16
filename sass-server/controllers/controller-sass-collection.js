const { connectd: connected } = require('../models/model-sass-collections');
const { StyleCompiler }  = require ( '../lib/compile' );

class ModelController{

    static connectionPath =  "mongodb://127.0.0.1:27017/sass_db";

    constructor( filename, collection, css, compiler = 'sass' ){
        if( !filename || !collection || !css )  
        {
            return;
        }
        this.filename       = filename,
        this.collection     = collection, 
        this.style          = css,
        // Defaults
        this.compiler       = compiler,
        this.connectionPath = "mongodb://127.0.0.1:27017/sass_db"
    }


    getCollection = async () => {
        try {
            const db = await connected( this.connectionPath );
            const collection = await db.collection( this.collection ).find({}).toArray();
            if( collection ){
                return collection;
            }
            else{
                console.log("No Collection found");
                return false;
            }
           
        } catch (error) {
            throw new Error(error.message);
        }
    };

    createSassRecord = async (collectionName = this.collection, fileName = this.filename, css = this.style) => {
        try {
            const db = await connected(this.connectionPath);
            // Check if the filename already exists in the collection
            const existingRecord = await db.collection( collectionName ).findOne({ filename: fileName });
            if (existingRecord) {
                // If the record exists - just update the css. 
                await db.collection(collectionName).updateOne({ filename: fileName }, { $set: { css } });
                return { filename: fileName, css };
            }
            else{
                //  Insert a new record for the CSS. 
                await db.collection(collectionName).insertOne({ filename: fileName, css });
                return { filename: fileName, css };
            }
           
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    getStyle = async (collectionName = this.collection, fileName = this.filename) => {
        try {
            const db = await connected( this.connectionPath );
            const sassRecord = await db.collection( collectionName ).findOne({ filename: fileName });
            if (!sassRecord) {
                console.log("No record found!");
                return false;
            }
            else{
                return sassRecord.css;
            }
        } catch (error) {
            return false;
        }
    };
    
    static getStyles = async ( collectionName, files ) => {
        try{
            const db = await connected( ModelController.connectionPath );
            const collection = db.collection( collectionName );
            let result = '';

            for (let file of files) {
                // Check if the file exists in the collection
                const existingFile = await collection.findOne({ filename: file });
            
                if ( existingFile && existingFile.css ) {
                    result += existingFile.css;
                }
            }
            return result;
        }  catch ( error ) {
            return false;
        }
    }

    store = async ( filename = this.filename, style = this.style, collection = this.collection, compilerType = this.compiler ) => {
        // Step 1 - Get compiler. 
        let compiler = new StyleCompiler( compilerType );

        // Step 2 - Compile
        let compiledStyle = await compiler.make( style );

        // Step 3 - Store the generated CSS in the given collection
        return await this.createSassRecord( collection, filename, compiledStyle );
    }
}
module.exports = { ModelController }