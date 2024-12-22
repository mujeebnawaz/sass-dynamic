## Overview

Most of the modern Web Applications uses Cascading Style Sheet (CSS) pre-processors such as [SASS](https://sass-lang.com/documentation/) or syntax transformation tools like [PostCSS](https://postcss.org/docs/postcss-architecture) to make the large stylesheets more managable and efficent. 

Development environments these days are usually equipped with bundlers like [Webpack](https://webpack.js.org/loaders/css-loader/) which essentially keeps compiling the javascript and CSS in the background. 

1. Once deployed it can be difficult to change anything within these bundled files on production. Although it is by design, sometimes it can be the case where on the fly compiliation is required.

2. Bundled files comes with alot of unused CSS i.e., a bundle of css might contain styles of another page. 

This package attempts to implement a naive solution to allow for on the fly compilation of styles and to make the styles delivery efficent by producing only the styles which are required for a given page. 


## Requirements

Only requires [Docker](https://docs.docker.com/)

## Getting Started

Clone the repository and get inside the repo's directory. 

#### Configure the Environment variables
Goto ```node.dockerfile``` configure the URL and port for the server at line 18 - 22.

Run the following
```docker-compose up```



## Stack

### Server
- **Node.js**
- **Express.js**
- **SASS compiler**
- **PostCSS compiler**

### Database
- **MongoDB** 


## Batch Processing

```scripts/scss-store.sh``` script allows automating the compiliation and storing. 

Given a directory, files names to exclude and a collection name - this script will iteratively call the API and store all the SASS files which are present in the given directory. 

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

Running the script with the as follows will store all the files except footer.scss in ```newcollection``` named collection.

```bash
./scritps/scss-store -d ../sass-examples -e footer.scss -c newcollection
```


## TODO

1. Wrting unit tests and integration tests for the APIs.
2. Adding support for a base stylesheet which can be used in UNION with other stylesheets. I.e., one can store a base style sheets of fonts and colors, and then seperate stylesheet for modules which would inherit from the base styles. 
3. To add support for import function of SASS. 
4. To add support for cloud based Mongodb instance / cluster including credentials.

