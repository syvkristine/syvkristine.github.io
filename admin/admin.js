
//html elementer
const skjemaBilder = document.querySelector("#skjemaBilder");
const inpBilde = document.querySelector("#inpBilde");
const infoBilde = document.querySelector("#infoBilde");
const inpTekst = document.querySelector("#inpTekst");

const ulBilder = document.querySelector("#ulBilder");
const infoOpplasting = document.querySelector("#infoOpplasting");

const skjemaInfo = document.querySelector("#skjemaInfo");
const inpTittel = document.querySelector("#inpTittel");
const taBeskrivelse = document.querySelector("#taBeskrivelse");

const overlay = document.querySelector("#overlay");
const overlayBekreftelse = document.querySelector("#overlayBekreftelse");
const norLagetDuProsjektet = document.querySelector("#norLagetDuProsjektet");
const inpFarge = document.querySelector("#inpFarge");


//const img = document.createElement("img");


// Henter database 
const db = firebase.database();
const storage = firebase.storage();


// hvor i databasen bildene skal lagres
const prosjekter = db.ref("testprosjekter");

// en array som lagrer bildene som skal sendes til databasen
let bilderSomSkalLastesOpp = [];


// regne om fil størrelsen på bildene i en mer brukevenlig funksjon
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }



 //viser informajson om bildet som skal lastes opp

 function visBildeinfo () {

    const bilde = inpBilde.files[0];
    const filnavn = bilde.name;
    const bytes = bilde.size;
    const storrelse = bytesToSize(bytes);


    infoBilde.innerText = filnavn + " " + storrelse;


 }

 function fjern(url) {
     // Fjerner bilde fra arrayet
     let nyttArray = bilderSomSkalLastesOpp.filter(bilde => bilde.url != url);
     bilderSomSkalLastesOpp = nyttArray;

     console.log(bilderSomSkalLastesOpp);

     lagringsPlass.delete();        

    const divSomSkalFjernes = document.getElementById(url);

     ulBilder.removeChild(divSomSkalFjernes);

     infoOpplasting.style.color = "#9C9C9C";

     infoOpplasting.innerText = `Ingen bilder lastet opp`;
     
 }
 
let lagringsPlass;

 // Lster opp et bilde til storage og lagrer url og info i arrayet
function lastOppBilde(evt){

    evt.preventDefault();

    


    // Starter opplasting
    overlay.style.display = "flex";

    const bilde = inpBilde.files[0];
    const filnavn = bilde.name;
    lagringsPlass = storage.ref("mineBilder" + (+new Date()) + bilde.filnavn);

    lagringsPlass.put(bilde)
    .then( opplastetBilde => opplastetBilde.ref.getDownloadURL() )
    .then ( url => {
        bilderSomSkalLastesOpp.push({

            url: url,
            tekst: inpTekst.value

        });

        overlay.style.display = "none";
    
        const div = document.createElement("div");        
        div.innerHTML = `            
            <span>${filnavn}</span>
            <img onclick="fjern('${url}')" id="fjernTegn" src="../img/remove-icon.svg">
        `;
        div.id = url;
        ulBilder.appendChild( div );

        div.animate([
            { transform: "translateX(-300px)" },
            { transform: "translateX(0)" }
        ], 500);

        let tekst = "bilde";
        if(bilderSomSkalLastesOpp.length > 1) {
            tekst = "bilder";
        }

        infoOpplasting.innerText = `${bilderSomSkalLastesOpp.length} ${tekst} er lastet opp`;

        infoOpplasting.style.color = "rgb(100, 141, 87)";

        

    } );

}

function lagreProsjekt(evt) {
    // denne gjør at innholdet blir på siden
    evt.preventDefault();

    if (bilderSomSkalLastesOpp.length < 1) {

        alert("du må laste opp et eller flere bilder");
        return; // kommer ikkke vidre før dette er gjort

    }

    //prosjekter.push({});
    prosjekter.push({
        tittel: inpTittel.value, 
        beskrivelse: taBeskrivelse.value,
        bilder: bilderSomSkalLastesOpp,
        aar: norLagetDuProsjektet.value, 
        farge: inpFarge.value
    });

    skjemaBilder.reset();
    skjemaInfo.reset();
    bilderSomSkalLastesOpp.length = 0;
    ulBilder.innerHTML = "";
    infoBilde.style.display = "none";
    infoOpplasting.innerText = `Ingen bilder lastet opp`;
    infoOpplasting.style.color = "rgb(100, 141, 87)";

    overlayBekreftelse.style.display = "flex";

    setTimeout( () => {
        overlayBekreftelse.style.display = "none";
    }, 3000);

}

//spør hvordan jeg kan få til dette med at den viser seg litsetog blir borte igjen etter så så lang tid. 
    



 // Event lisners
inpBilde.addEventListener("change", visBildeinfo);
skjemaBilder.addEventListener("submit", lastOppBilde);
skjemaInfo.addEventListener("submit", lagreProsjekt);


