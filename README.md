# A cat simulator
Most of my React components and logic are stored in [CatSim.js](src/CatSim.js)  
My styling is done in Sass and compiled at build time, viewable in [CatSim.scss](src/CatSim.scss)

## The Cats
Cat objects that have consistently decrementing needs that can be interacted with  
You must manage:
* Hunger, by feeding them
* Love, by petting them  

If you feel overwhelmed with the choices you've made that brought you to owning all these cats, you may **SURRENDER** your cats

## New Cats
There is no shortage of cats needing adoption, you may adopt as many as you'd like  
New cats get a random name  
* Pulled from an array based on Social Security's most popular baby names of 2019  

New cats get a random cat image
* Pulled during creation from [TheCatAPI](https://thecatapi.com/) using an async AJAX call
  
## Changelog
#### v1.2  
* Added **Persistent cats** 
  * Cats will persist between sessions  
  * They are automatically saved to the *localStorage*  
* Code organization  
* Fixed issue with hunger levels falling below 0  
* Layout changes  
#### v1.1
* Added **Note timeout** feature 
  * Each cat has an array of notes, containing a *note* object with *message* and *timeout* keys  
  * Timeout is decremented each tick until 0, at which point it is removed   
* Starting cats are now random  
* Some function refactoring  
* Formatting and layout changes  
  
## To Do  
* Add spinner graphic to indicate loading  
  * While the new cat is generated  
  * While picture is downloaded from API  
* Cat actions  
  * Cats will have a chance to perform certain actions, like meowing  
  * Chance will increase the longer it's been since the last action  
* Break out more components; refactoring
  
### Other Notes
React app scaffolding by [Create React App](https://create-react-app.dev/)  
Styles are the Bootstrap based [reactstrap(https://reactstrap.github.io/)
