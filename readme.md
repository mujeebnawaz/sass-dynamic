## Overview

Most modern Web Applications uses Cascading Style Sheet (CSS) pre-processors such as [SASS](https://sass-lang.com/documentation/) or syntax transformation tools like [PostCSS](https://postcss.org/docs/postcss-architecture) to make the large stylesheets more managable and efficent. 

Development environments these days are usually equipped with bundlers like [Webpack](https://webpack.js.org/loaders/css-loader/) which essentially keeps compiling the javascript and CSS during the development phase and once development phase is over - files are bundled and deployed.



## Requirements

1. Docker

## Technologies Used

This project was built using the following technologies:

- **Node.js**: JavaScript runtime for server-side code.
- **Express.js**: Server to implement APIS
- **MongoDB**: NoSQL database for storing data.
- **SASS**: 


## Batch Processing

```scripts/scss-store.sh``` script allows for automating the compiliation and storing. Given a directory, files to exclude and collection name - this script will iteratively call the API and store all the SASS files. 

### Example:

If there is a directory as follows:

```
sass-examples
├── footer
│   └── footer.scss
├── head.scss
└── m01-carousel
    └── block.scss
...
scripts
```

Running the script with the as follows will store all the files but footer.scss in ```newcollection```.

```bash
./scritps/scss-store -d ../sass-examples -e footer.scss -c newcollection
```


## TODO

1. Wrting unit tests and integration tests for the APIs.
2. Adding support for a base stylesheet which can be used in UNION with other stylesheets. I.e., one can store a base style sheets of fonts and colors, and then seperate stylesheet for modules which would inherit from the base styles. 
3. Adding support for import function of SASS. 


