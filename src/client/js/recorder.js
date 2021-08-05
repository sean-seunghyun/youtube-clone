console.log('recorder');
const recorderBtn = document.querySelector("#recorderBtn");
const videoRecording = document.querySelector("#videoRecording");
let stream = null;
let recorder = null;
let videoFile = null;

const init = async () =>{
    stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: 100, height: 100
        },
        audio:false
    });
    videoRecording.srcObject = stream;
    videoRecording.onloadedmetadata = () =>{
        videoRecording.play();
    }
}

const handleStartRecording = async () =>{
    recorderBtn.removeEventListener("click", handleStartRecording);
    recorderBtn.addEventListener("click", handleStopRecording)
    recorderBtn.innerHTML = 'Stop Recording';

    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        videoRecording.srcObject = null;
        videoRecording.src = videoFile;
        videoRecording.loop = true;
        videoRecording.play();
    }
    recorder.start();
    console.log("recorder started");
}

const handleStopRecording = async () =>{
    recorderBtn.removeEventListener("click", handleStopRecording);
    recorderBtn.addEventListener("click", handleDownloadRecording);
    recorderBtn.innerHTML = 'download Recording';
    recorder.stop();
}

const handleDownloadRecording = async () => {
    const a = document.createElement('a');
    a.href = videoFile;
    a.download = 'myRecording.webm';
    document.body.appendChild(a);
    a.click();
}

init();

recorderBtn.addEventListener("click", handleStartRecording);

