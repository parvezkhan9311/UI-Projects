console.log("Welcome to Spotify");


//initialize the varliable
let songIndex=0;
let audioElement=new Audio('song1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let isPlaying = false;

let songs=[
    {songName: "Pehla Nasha", filePath: "song1.mp3", coverPath: "covers1.jpg"},
    {songName: "Heeriye Heeriye", filePath: "song2.mp3", coverPath: "covers2.jpg"},
    {songName: "Oo Jaane Jana", filePath: "song3.mp3", coverPath: "covers3.jpg"},
    {songName: "Teri Galiyan", filePath: "song4.mp3", coverPath: "covers4.jpg"},
    {songName: "Tjhe Kitna Chahne", filePath: "song5.mp3", coverPath: "covers5.jpg"},
    {songName: "Teri Meri Prem Kahani", filePath: "song6.mp3", coverPath: "covers4.jpg"},
    {songName: "Tum hi ho", filePath: "song7.mp3", coverPath: "covers3.jpg"},
    {songName: "Kesariya", filePath: "song8.mp3", coverPath: "covers2.jpg"},
    {songName: "Teri chunairya", filePath: "song9.mp3", coverPath: "covers1.jpg"},
    {songName: "Ratan Lambiyan", filePath: "song10.mp3", coverPath: "covers5.jpg"}
]
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

});

async function playAudio() {
    try {
        await audioElement.play();
        isPlaying = true;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Playback was aborted.');
        } else {
            console.error('Error playing audio:', error);
        }
    }
}

function pauseAudio() {
    audioElement.pause();
    isPlaying = false;
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
}
songItems.forEach((element, i) => {
    element.addEventListener('click', () => {
        if (songIndex === i && isPlaying) {
            // Pause the audio if the same song is clicked and it's playing
            pauseAudio();
        } else {
            // Play the clicked song
            songIndex = i;
            audioElement.src = songs[i].filePath;
            masterSongName.innerText = songs[i].songName;
            playAudio();
        }
    });
});

// Master play/pause button logic
masterPlay.addEventListener('click', () => {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

masterPlay.addEventListener('click', ()=> {

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
});

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
//update seekbar
progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
//console.log(progress);
myProgressBar.value=progress;
});

myProgressBar.addEventListener('change', ()=> {

    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})

audioElement.addEventListener('error', (e) => {
    console.error('Error with audio playback:', e);
  });
  
    const makeAllPlays=()=>{
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');

        });
  }
  
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`song${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play'); 
        masterPlay.classList.add('fa-circle-pause');
    })
 
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
   songIndex=0;
    }
    else{
    songIndex+=1;
    }
    audioElement.src=`song${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play'); 
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
   songIndex=9;
    }
    else{
    songIndex-=1;
    }
    audioElement.src=`song${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play'); 
    masterPlay.classList.add('fa-circle-pause');

})











