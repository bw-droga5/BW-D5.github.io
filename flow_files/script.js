var videoContainer = document.getElementById("video-compare-container"),
videoUI = document.getElementById("videoUI"),
videoMerge = document.getElementById("videoMerge"),
leftVideo = document.getElementById("leftVideo"),
rightVideo = document.getElementById("rightVideo"),
midVideo = document.getElementById("midVideo"),
videoControl = document.createElement("button"),
position = 0.5,
// vidHeight = 720,
vidHeight = 540,
// vidWidth = 1280;
vidWidth = 960;
mergeContext = videoMerge.getContext("2d");
videoContainer.style.display = "none";
videoControl.innerHTML = "Play";
videoUI.appendChild(videoControl);
videoControl.addEventListener("click", playPause, false);

function playPause() {
    if (leftVideo.paused) {
        videoControl.innerHTML = "Pause";
        playVids();
    } else {
        leftVideo.pause();
        rightVideo.pause();
        midVideo.pause();
        videoControl.innerHTML = "Play";
    }
}
function playVids() {
    if (leftVideo.readyState > 3 && rightVideo.readyState > 3 && midVideo.readyState > 3) {
    leftVideo.play();
    rightVideo.play();
    midVideo.play();
        
	function trackLocation(e) {
            position = ((e.pageX - videoMerge.offsetLeft) / videoMerge.offsetWidth);
 		if (position <= 0.5 && position >= 0) {
            		
                     midVideo.volume = (2 * position);
        }
        if (position <= 1 && position >= 0.5) {
            		
                     midVideo.volume = (1 - position);
        }
        if (position <= 1 && position >= 0) {
            		leftVideo.volume = position;
            		rightVideo.volume = (1 - position) / 2;
        }
    }
    
videoMerge.addEventListener("mousemove", trackLocation, false); 
videoMerge.addEventListener("touchstart",trackLocation,false);
videoMerge.addEventListener("touchmove",trackLocation,false);

        function drawLoop() {
            mergeContext.drawImage(leftVideo, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);
            mergeContext.drawImage(rightVideo, (vidWidth * position).clamp(0.01,vidWidth), 0, (vidWidth - (vidWidth * position)).clamp(0.01,vidWidth),
		vidHeight,(vidWidth * position).clamp(0.01,vidWidth), 0, (vidWidth - (vidWidth * position)).clamp(0.01,vidWidth), vidHeight);
            requestAnimationFrame(drawLoop);
        }
    requestAnimationFrame(drawLoop);
}
}
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};