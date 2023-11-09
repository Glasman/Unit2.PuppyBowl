const main = document.querySelector("main");
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players/`;
const form = document.querySelector("form");
const state = {
  allPuppies: [],
};

async function pullAPIAllPlayers() {
  const response = await fetch(APIURL);
  const puppies = await response.json();
  
  state.allPuppies = puppies.data.players;
  
  renderAllPuppies();
}
function renderAllPuppies() {
  main.innerHTML = "";
  state.allPuppies.forEach((puppy) => {
    const puppyDiv = document.createElement("div");
    puppyDiv.style.borderTop = "3px solid #000000";
    puppyDiv.style.borderBottom = "3px solid #000000";
    html = `
    <div id=${puppy.id}>
    <h2>This puppy's name is ${puppy.name} </h2>
    <img src=${puppy.imageUrl} alt="a cute puppy"; id=${puppy.id} style="width: 300px; height: 300px;">
    </div>
    `;
    puppyDiv.innerHTML = html;
    main.appendChild(puppyDiv);
    puppyDiv.addEventListener("click", (event) => {
      renderPuppyDetails(event.target.id);
    });
  });
}

async function renderPuppyDetails(id) {
  const response = await fetch(APIURL + id);
  const puppy = await response.json();
  console.log(puppy)

  const html = `
  <h2>${puppy.data.player.name}</h2>
  <img src=${puppy.data.player.imageUrl} />'
  <p>Meet ${puppy.data.player.name}. They are a ${puppy.data.player.breed} and they are currently on the ${puppy.data.player.status}.</p>
  <button id='backButton'>Back</button>
  `;
  main.innerHTML = html;
  const backButton = document.querySelector("#backButton");
  backButton.addEventListener(`click`, () => renderAllPuppies());
}

//function to add a new puppy
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const puppyName = document.querySelector("#puppyName");
  const puppyBreed = document.querySelector("#puppyBreed");
  const puppyImgURL = document.querySelector("#imgURL");
  const puppyDescription = document.querySelector("#description");

  const response = await fetch(APIURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: puppyName.value,
      breed: puppyBreed.value,
      imageUrl: puppyImgURL.value,
    }),
  });
  const responseJSON = await response.json()
  const newPuppy = responseJSON.data.newPlayer
  state.allPuppies.push(newPuppy)
  renderAllPuppies()
});

pullAPIAllPlayers();
