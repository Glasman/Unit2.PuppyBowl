const main = document.querySelector('main')
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players`
async function pullAPIAllPlayers() {
  const response = await fetch(APIURL)
  const puppies = await response.json();
  console.log(puppies)
}
pullAPIAllPlayers()