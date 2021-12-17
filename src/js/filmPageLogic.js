import {constants} from "./constants";
let response = await fetch(`${constants.URL}/movie/4`)
let result = await response.json();
console.log(result)
console.log('asdadasdasda')
