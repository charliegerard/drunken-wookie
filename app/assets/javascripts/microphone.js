//Not sure I actually need that here so I need to double check.
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

 var array;
 var boost = 0;

//--------------  ACCESSING THE MICROPHONE ------------
//This helped a lot: http://updates.html5rocks.com/2012/09/Live-Web-Audio-Input-Enabled

  function gotStream(stream) {
  	//creating an audio context.
  	window.AudioContext = window.AudioContext || window.webkitAudioContext;
  	var audioContext = new AudioContext();

  	// Create an AudioNode from the stream.
  	var microphone = audioContext.createMediaStreamSource(stream);
  	var filter = audioContext.createBiquadFilter();

    	  analyser = audioContext.createAnalyser();
    		analyser.smoothingTimeConstant = 0.5;
      	analyser.fftSize = 512;
    	  microphone.connect(analyser)
        //This line doesn't seem to actually do anything...
    	  //microphone.connect(audioContext.destination)
    	  filter.connect(analyser)

        //Disconnect the analyser so there is no feedback.
  		  //analyser.connect(audioContext.destination)

  		  source = audioContext.createBufferSource();
  		  source.connect(analyser)

  		//ANALYSES THE INPUT FROM MICROPHONE
  	function process(){
      sizeValue = parseInt($('#sizeInput').val());
      if (window.microphoneOn === false) {
        microphone.disconnect(0);
        //Need to set the analyser to null to stop the animation.
        analyser = null;
        // Might need to disconnect the other analysers.
      }

  	  //FFTData = new Float32Array(analyser.frequencyBinCount);
  	  FFTData = new Uint8Array(analyser.frequencyBinCount);
  		analyser.getByteTimeDomainData(FFTData); // OMG IS THIS THE SOLUTION???
  		    
  		array = new Array();
  		array = FFTData;

  		//microphone.onaudioprocess = function(e){
      array = new Uint8Array(analyser.frequencyBinCount);
      //Puts the sound data in the analyser?
      analyser.getByteFrequencyData(array);
      //Other way of analysing sound:
      //analyser.getByteTimeDomainData(array);
      boost = 0;
      //Not sure about that. 
      for(var i = 0; i < array.length; i++){
      	boost += array[i];
      }
      boost = (boost / array.length) * (sizeValue * 2);
      //boost = (boost / array.length);
      //value is the value got from the slider in the control panel.
      //I multiply it by 2 just so the visual impact is more important.
      //};
      requestAnimFrame(process);
  	}
  		requestAnimFrame(process);
  };  //End of gotStream function

  function noStream(){
    alert("The microphone is not activated")
  }
 
//Massive thanks to Sann-Remy for putting his code on github. Huge help!
//http://srchea.com/experimenting-with-web-audio-api-three-js-webgl

