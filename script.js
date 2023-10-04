const audioContainer = document.getElementById('audioContainer');
const audio = document.querySelector('audio');

const songTitle = document.getElementById('songTitle');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');

const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');


const songsArray = ['Addicted-To-You', 'Bad-Reputation', 'Fades-Away', 'Heart-Upon-My-Sleeve', 'Hey-Brother', 'Levels', 'The-Nights', 'Tough-Love', 'Waiting-For-Love', 'Wake-Me-Up', 'Without-You'];

let songIndex = 0;
let selectedSong;



//Set a Song

function setSong() {
    selectedSong = songsArray[songIndex];

    audio.src = `audio/${selectedSong}.mp3`;
    songTitle.innerText = `${selectedSong.replace(/-/g, ' ')}`
}

setSong();


//Play Song

function playOrPauseSong() {
    if (audio.paused) {
        audioContainer.classList.add('playing');
        audioContainer.classList.add('spinning');
        audio.play();
        playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`
    }
    else {
        audio.pause();
        playButton.innerHTML = `<i class="fa-solid fa-play"></i>`
        audioContainer.classList.remove('spinning');
    }
}


//Stop Song

function stopSong() {
    audio.pause();
    audio.currentTime = 0;
    playButton.innerHTML = `<i class="fa-solid fa-play"></i>`
    audioContainer.classList.remove('spinning');
}


//Previous Song

function previousSong() {
    songIndex -= 1;
    if (songIndex < 0) {
        songIndex = songsArray.length - 1;
    }
    setSong();
    playOrPauseSong();
}


//Next Song

function forwardSong() {
    songIndex += 1;
    if (songIndex > songsArray.length - 1) {
        songIndex = 0;
    }
    setSong();
    playOrPauseSong();
}




//Update Progress Bar

function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}


//Change Progress

function changeProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


playButton.addEventListener('click', playOrPauseSong);
stopButton.addEventListener('click', stopSong);
backButton.addEventListener('click', previousSong);
forwardButton.addEventListener('click', forwardSong);

audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', changeProgress);

audio.addEventListener('ended', forwardSong);