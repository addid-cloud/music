const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEL = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio()

const songs = [
    {
        path:'assets/Everything Goes On Kobo Kanaeru Cover.mp3',
        displayNmae:'Everything Goes On ',
        cover:'assets/kobo1.jpg',
        artist:'Kobo Kanaeru'
    },
    {
        path:'assets/aitai.mp3',
        displayNmae:'Aitai',
        cover:'assets/aitai.jpg',
        artist:'Mosawo'
    },
    {
        path:'assets/Faith.mp3',
        displayNmae:'Faith',
        cover:'assets/kobo2.jpg',
        artist:'Kobo Kanaeru'
    }
]

let musicIndex = 0;
let isPlaying = false;
function togglePlay(){
    if(isPlaying){
        pauseMusic()
    }else{
        playMusic()
    }
}

function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('tittle', 'Pause')
    music.play()
}
function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('tittle', 'Play')
    music.pause()
}
function loadMusic(song){
    music.src = song.path
    title.textContent = song.displayNmae;
    artist.textContent = song.artist
    image.src = song.cover
    background.src = song.cover
}
function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length
    loadMusic(songs[musicIndex])
    playMusic()
}

function updateProgressBar(){
    const {duration, currentTime} = music
    const progressPercent = (currentTime/duration)*100
    progress.style.width = `${progressPercent}%`

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0')
    durationEL.textContent = `${formatTime(duration/60)}:${formatTime(duration % 60)}`
    currentTimeEl.textContent = `${formatTime(currentTime/60)}:${formatTime(currentTime % 60)}`
}

function setProgressBar (e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX
    music.currentTime = (clickX/width)* music.duration
}



playBtn.addEventListener('click', togglePlay)
prevBtn.addEventListener('click', ()=> changeMusic(-1))
nextBtn.addEventListener('click', ()=> changeMusic(1))
music.addEventListener('ended', ()=>changeMusic(1))
music.addEventListener('timeupdate', updateProgressBar)
playerProgress.addEventListener('click', setProgressBar)
nextBtn.addEventListener('click', console.log("oke"))

loadMusic(songs[0])

$(document).ready(function () {
    // Hide the loading screen when the page is fully loaded
    $(window).on('load', function () {
        $('#loading-screen').fadeOut('slow');
    });
});