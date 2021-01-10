navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(gotMedia)
  .catch(err => console.error("getUserMedia() failed: ", err));

function gotMedia(mediastream) {
  const video = document.querySelector("video");
  video.srcObject = mediastream;
  const support = document.createElement('p')
  const focusInfo = document.createElement('p')
  const track = mediastream.getVideoTracks()[0];
  const capabilities = track.getCapabilities();

    // Check whether focus distance is supported or not.
    if (!capabilities.focusDistance) {
        support.innerHTML = "Not supported"
        return;
    } 
    else {
        support.innerHTML = "Supported"
    }
    document.body.appendChild(support)
    document.body.appendChild(focusInfo)
    focusInfo.innerHTML = 0
  // Map focus distance to a slider element.
  const input = document.querySelector('input[type="range"]');
  input.min = capabilities.focusDistance.min;
  input.max = capabilities.focusDistance.max;
  input.step = capabilities.focusDistance.step;
  console.log(input.value)
  input.value = track.getSettings().focusDistance;
  console.log(input.value)

  track.applyConstraints({
    advanced: [{
      focusMode: "manual",
      focusDistance: 255
    }]
  })

  input.oninput = function(event) {
      focusInfo.innerHTML = event.target.value
    track.applyConstraints({
      advanced: [{
        focusMode: "manual",
        focusDistance: event.target.value
      }]
    });
  };
  input.hidden = false;
}