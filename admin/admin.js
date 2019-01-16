
// Henter database 
//const db = firebase.database();


//html elementer
const btn = document.querySelector("#btn");
const preview = document.querySelector("#preview");

let editor;


// tekst boks som åpner seg når du skriver
BalloonEditor
    .create( document.querySelector( '#editor' ) )
    .then( nedEditor => {
        editor = nedEditor;
    } )
    .catch( error => {
        console.error( error );
    } );


function visInnhold(){

        preview.innerHTML = editor.getData();
        // getData henter utndet som står i input feltet
    
    
} 


btn.addEventListener("click", visInnhold);