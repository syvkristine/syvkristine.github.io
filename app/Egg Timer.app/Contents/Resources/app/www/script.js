
duration = {}
softmin = 6;

duration.min = softmin;
duration.sec = 0;
 
var resetDurationMin = softmin;

var timer = document.querySelector('.time');

var startbt = document.getElementById('startBt');
var stopbt = document.getElementById('stopBt');

var softEgg = document.querySelector('.softEgg');
var mediumEgg = document.querySelector('.mediumEgg');
var hardEgg = document.querySelector('.hardEgg');

var softEggWrapper = document.querySelector('.softEggWrapper');
var mediumEggWrapper = document.querySelector('.mediumEggWrapper');
var hardEggWrapper = document.querySelector('.hardEggWrapper');


startbt.addEventListener('click', handleStartClick);
stopbt.addEventListener('click', handleStopClick);



softEgg.addEventListener('click', handleSoftEggClick);
mediumEgg.addEventListener('click', handleMediumEggClick);
hardEgg.addEventListener('click', handleHardEggClick);




function handleSoftEggClick (event){

    console.log ('medium egg er cliket på');
    duration.min = 6;
    resetDurationMin = duration.min;
    showDuration();
    softEggWrapper.classList.add("selectedEgg");
    hardEggWrapper.classList.remove("selectedEgg");
    mediumEggWrapper.classList.remove("selectedEgg");


}

function handleMediumEggClick (event){

    console.log ('medium egg er cliket på');
    duration.min = 8;
    resetDurationMin = duration.min;
    showDuration();
    mediumEggWrapper.classList.add("selectedEgg");
    softEggWrapper.classList.remove("selectedEgg");
    hardEggWrapper.classList.remove("selectedEgg");

   
}

function handleHardEggClick (event){

    console.log ('hard egg er cliket på');
    //legg til html 
    duration.min = 10;
    resetDurationMin = duration.min;
    showDuration();
    hardEggWrapper.classList.add("selectedEgg");
    mediumEggWrapper.classList.remove("selectedEgg");
    softEggWrapper.classList.remove("selectedEgg");

    

}

var intervalObj;

function handleInterval() {
    if (duration.min == 0 && duration.sec == 0){
        //clearInterval(intervalObj); 
        stopTiden();
    } else {
        countDown();
        showDuration();
    }
}

function handleStartClick (event) {

    intervalObj = setInterval(handleInterval, 1000)

    startbt.classList.add("skjul");
    stopbt.classList.remove("skjul");


    console.log ('start klokken');
  
}

function stopTiden (){
    clearInterval(intervalObj); 
}



function handleStopClick (){

    stopTiden();
    duration.min = resetDurationMin;
    duration.sec = 0;
    showDuration();
    startbt.classList.remove("skjul");
    stopbt.classList.add("skjul");
    
}

function countDown() {

    duration.sec =  duration.sec - 1;

    if (duration.sec < 0) {

        duration.min = duration.min -1
        duration.sec = 59;
    }
    console.log(duration);


}

function showDuration(){

    var min = duration.min;
    var sec = duration.sec;
    
    if (min < 10){

        min = '0' + min;

    }

    if (sec < 10){

        sec = '0' + sec;
    }

    timer.textContent = min + ':' + sec;


}




