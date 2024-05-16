const sass = require('sass');
const postcss = require('postcss');
const CleanCSS = require('clean-css');

class StyleCompiler{
    constructor( name = 'sass' ) {
        this.compiler = name;
    }
    make = async ( styleString ) => {
        try{
            let generated = '';
            if( this.compiler !== 'sass' ){
                generated = await postcss([]).process( styleString ).css;
            }
            else{
                generated = await sass.compileString( styleString ).css;
            }
            return this.minify( generated ); 
        }
        catch ( error ){
            return false;
        }
    }
    minify = ( style ) => {  
        if (!style || typeof style !== 'string' ) {
            return ''; // Return empty string if CSS content is empty or undefined
        }
        const minifiedCss = new CleanCSS().minify( style );
        return minifiedCss.styles;
    }

}

module.exports = { StyleCompiler }