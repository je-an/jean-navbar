## Description

Provides a navbar for a single page website. 

## Support
Supports AMD eco system. If there is no loader, Navbar is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
/**
 * To navigate within the website, HTML elements must exist whose IDs match the IDs that 
 * are passed to the constructor as a parameter (sections array).
 */
var navbar = new Navbar({
    // The title, which will be displayed 
    title: "JeanNavbar",
    // Id of the container element in which the Navbar is placed
    containerId: "jean-navbar-container",
    // The path for the icon, which will be displayed 
    icon: "../img/favicon.ico",
    // The sections which will be listed - Equal to the ids of the html elements
    sections: ["One", "Two", "Three"],
    // Executed, wenn a section is clicked
    onSectionClick: function (id) {
        console.log("Section: " + id + " clicked");
    }
});
// Creates the navbar an inject it into the DOM
navbar.create();
```
- Use with require.js
```js
require(["path/to/Navbar"], function(Navbar){
    // Work with Navbar
});
```

## Style
- The control comes with build-in styles, which will programmatically be injected into the page head as style tag. 
- For custom styling add own styles to the end of the body.

## Installation

`npm install jean-navbar --save --legacy-bundling`

## API Reference

### Navbar Constructor

**Options**
- **title**: `String` - `mandatory` - Title to be displayed
- **containerId**: `String` - `optional` - Id of the container in which the Navbar is placed
- **icon**: `String` - `optional` - Icon path, which will be displayed
- **sections**: `String[]` - `optional` - The sections which will be listed
- **onSectionClick**: `Function` - `optional` - Executed, wenn a section is clicked

### Navbar.centerElements() 

Centers the elements which are part of the navbar regarding to the highest element

**Returns**
- `Boolean` - True if elements are centered, false otherwise

### Navbar.create() 

Creates the navbar control element

**Returns**
- `Boolean` - True if the element is created, false otherwise


## Tests

- Open spec/spec-runner.html in browser to see the test cases.
- Open example/index.html in your web browser for an example implementation.

## License

MIT