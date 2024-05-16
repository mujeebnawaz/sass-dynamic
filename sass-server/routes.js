'use strict';
const express = require( 'express' );
const router  = express.Router()
const { ModelController }   = require( './controllers/controller-sass-collection' );


router.post('/store', async (request, response) =>{
    let data = request.body;

    if( data.filename === undefined || 
        data.css === undefined || 
        data.collection === undefined ||
        data.compiler === undefined ){
        /**
         * If any of the required parameters are missing
         * - Respond with 400 bad request. 
         */
        response.sendStatus( 400 )
    }
    else{
        let modelController = new ModelController( data.filename, data.collection, data.css );
        await modelController.store();
        let style = await modelController.getStyle();
        response.send( style );
    }
});

router.get('/gets', async( request, response ) => {

    if( ! request.query.styles || ! request.query.collection ){
        /**
         * If any of the required parameters are missing
         * - Respond with 400 bad request. 
         */
        response.sendStatus( 400 )
    }
    else{
        let requestStyles = request.query.styles.split(" ");
        let styles = await ModelController.getStyles( request.query.collection, requestStyles );
        response.send( styles );
    }
});

router.get('/', async (req, res) => {
    let data = { error: "Please define a route" };
    res.send(data);
});

module.exports = router;
