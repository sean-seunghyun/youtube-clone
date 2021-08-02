const video = document.querySelector("video");
const playBtn = document.querySelector("#play");
const muteBtn = document.querySelector("#mute");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const volume = document.querySelector("#volume")
let volumeValue = 0.5;

const handlePlayBtn = () => {
    if(video.paused){
        video.play();
    }
    else {
        video.pause();
    }
    video.paused ? playBtn.innerHTML = 'Paused' : playBtn.innerHTML = 'Play';
}

const handleMuteBtn = () => {
    if(!video.muted){
        video.muted = true;
        volumeValue = 0;
    }
    else {
        video.muted = false;
        volume.value = volumeValue;
        video.volume = volumeValue;
    }
    video.muted ? muteBtn.innerHTML = 'Unmute' : muteBtn.innerHTML = 'Mute';
}

const handleVolume = () => {
    if(video.muted){
        muteBtn.innerHTML = 'volume';
    }
    volumeValue = volume.value;
    video.volume = volumeValue;
}


const handleMetadata = () => {
    totalTime.innerHTML = Math.floor(video.duration);
}

const handleTimeUpdate = () => {
    currentTime.innerHTML = Math.floor(video.currentTime);
}

playBtn.addEventListener("click", handlePlayBtn);
muteBtn.addEventListener("click", handleMuteBtn);
volume.addEventListener('input', handleVolume);
video.addEventListener("loadedmetadata", handleMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);