const secProsjekter = document.querySelector("#secProsjekter");
const tidsLinje = document.querySelector(".tidsLinje");


// Henter database 
const db = firebase.database();
const prosjekter = db.ref("testprosjekter");


let ypos = 0;



function visProsjekt(snap) {

    const prosjekt = snap.val();
    ypos += 1000;

    tidsLinje.style.height = ypos + 700 + "px";


    secProsjekter.innerHTML += `
            <div class="wrapper1" style="top: ${ypos}px">
                <div class="beskrivelseAvProsjekt">
                    <h3 data-aos="fade-up" data-aos-duration="6000">${prosjekt.tittel}</h3>
                    <p data-aos="fade-up" data-aos-duration="6000" >${prosjekt.beskrivelse}</p>
                    <figure data-aos="zoom-in" data-aos-duration="2000" class="framVisningBakgrun" style="border-color: ${prosjekt.farge}"></figure>
                </div>
                <div>
                    <h2>${prosjekt.aar}</h2>
                </div>
                <div class="framvisningAvprosjekt">
                    <img  data-aos="fade-up" data-aos-duration="3000" src="${prosjekt.bilder[0].url}" alt="${prosjekt.bilder[0].tekst}">
                </div>
            </div>   
    `;
    
}

prosjekter.on("child_added", visProsjekt);


