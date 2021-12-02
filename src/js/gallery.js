const url = 'https://wowmeup.pp.ua';

async function getResponseMovies() {
	const res = await fetch(`${url}/movie`);
	const response = await res.json();
	console.log(response)
	return response;
}
getResponseMovies();

