const main = document.querySelector('main')
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players`
const state = {
  allPuppies: []
}

async function pullAPIAllPlayers() {
  const response = await fetch(APIURL)
  const puppies = await response.json();
  state.allPuppies = puppies.data.players
  console.log(state.allPuppies)
  renderAllPuppies()
}
function renderAllPuppies() {
  main.innerHTML = ''
  state.allPuppies.forEach((puppy) => {
    console.log(puppy.name)
    const puppyDiv = document.createElement('div')
    puppyDiv.style.borderTop = "3px solid #000000";
    puppyDiv.style.borderBottom = "3px solid #000000";
    html = `
    <div id=${puppy.id}>
    <h2>This puppy's name is ${puppy.name} </h2>
    <img src=${puppy.imageUrl} alt="a cute puppy" style="width: 300px; height: 300px;">
    </div>
    `
    puppyDiv.innerHTML = html
    main.appendChild(puppyDiv)
  }

  )
}
pullAPIAllPlayers()