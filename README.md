# A cat simulator
Most of my React components and logic are stored in [CatSim.js](react-cat-sim/src/CatSim.js)
My styling is done in Sass and compiled at build time, viewable in [CatSim.scss](react-cat-sim/src/CatSim.scss)

## The Cats
Cat objects that have consistently decrementing needs that can be interacted with
You must manage their
* Hunger, by feeding them
* Love, by petting them
If you feel overwhelmed with the choices you've made that brought you to owning all these cats, you may **SURRENDER** your cats

## New Cats
There is no shortage of cats needing adoption, you may adopt as many as you'd like
New cats get a random name
* Pulled from an array based on Social Security's most popular baby names of 2019
New cats get a random cat image
* Pulled during creation from [TheCatAPI](https://thecatapi.com/) using an async AJAX call


### Other Notes
React app scaffolding by [Create React App](https://create-react-app.dev/)
Styles are the Bootstrap based [reactstrap(https://reactstrap.github.io/)
