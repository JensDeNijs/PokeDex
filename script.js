(() => {
    let getID, api_url, api_urlDex,api_urlEvolve, evolveName, evolvePic;

    async function getData() {
        const response = await fetch(api_url)
        const data = await response.json();

        console.log(data);
        let pokeName = data.name;
        let pokeID = data.id;
        let pokePic = data.sprites.front_default;
        let pokeMove1 = data.moves[0].move.name;
        let pokeMove2 = data.moves[1].move.name;
        let pokeMove3 = data.moves[2].move.name;
        let pokeMove4 = data.moves[3].move.name;
        //slice

        console.log(pokeName);
        console.log(pokeID);
        console.log(pokePic);
        console.log(pokeMove1);
        console.log(pokeMove2);
        console.log(pokeMove3);
        console.log(pokeMove4);

        getDataDex()
        document.getElementById("spanPokeName1").textContent= ("It's "+ capitalize(pokeName)+"!");
        document.getElementById("spanPokeName2").textContent= capitalize(pokeName);
        document.getElementById("spanPokeID").textContent= pokeID;
        document.getElementById("spanMove1").textContent= capitalize(pokeMove1);
        document.getElementById("spanMove2").textContent= capitalize(pokeMove2);
        document.getElementById("spanMove3").textContent= capitalize(pokeMove3);
        document.getElementById("spanMove4").textContent= capitalize(pokeMove4);
        document.getElementById("pokePicture").src= pokePic;

    }
    async function getDataDex() {
        const responseDex = await fetch(api_urlDex)
        const dataDex = await responseDex.json();
        if (dataDex.evolves_from_species){
            evolveName= dataDex.evolves_from_species.name;
            api_urlEvolve = 'https://pokeapi.co/api/v2/pokemon/' + evolveName;

            console.log(evolveName);
            console.log(api_urlEvolve);

            getDataEvolve()

        }else{
            document.getElementById("spanPokeEvolveName").textContent= "";
            document.getElementById("pokePictureEvolve").src= "";

        }
    }

    async function getDataEvolve() {
        const responseEvolve = await fetch(api_urlEvolve)
        const dataEvolve = await responseEvolve.json();
        evolvePic = dataEvolve.sprites.front_default;

        document.getElementById("spanPokeEvolveName").textContent= ("This Pokémon is evolved from: "+capitalize(evolveName));
        document.getElementById("pokePictureEvolve").src= evolvePic;

        console.log(evolvePic);
    }

    document.getElementById("submitPoke").addEventListener("click", function () {
        getID = (document.getElementById("inputPoke").value).toLowerCase()
        api_url = 'https://pokeapi.co/api/v2/pokemon/' + getID;
        api_urlDex = 'https://pokeapi.co/api/v2/pokemon-species/' + getID;
        getData()
    })

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    
})();