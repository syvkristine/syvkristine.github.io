const secProsjekter = document.querySelector("#secProsjekter");


// Henter database 
const db = firebase.database();
const prosjekter = db.ref("testprosjekter");


let ypos = 0;



function visProsjekt(snap) {

    const prosjekt = snap.val();
    ypos += 1000;


    secProsjekter.innerHTML += `
            <div class="wrapper1" style="top: ${ypos}px">
                <div class="beskrivelseAvProsjekt">
                    <h3>${prosjekt.tittel}</h3>
                    <p>${prosjekt.beskrivelse}</p>
                    <figure class="framVisningBakgrun"></figure>
                </div>
                <div>
                    <h2>2017</h2>
                </div>
                <div class="framvisningAvprosjekt">
                    <img src="${prosjekt.bilder[0].url}" alt="${prosjekt.bilder[0].tekst}">
                </div>
            </div>   
    `;
    
}

prosjekter.on("child_added", visProsjekt);


