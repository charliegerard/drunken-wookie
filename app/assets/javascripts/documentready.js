
$(document).ready(function(){
	//Calls the cube as first shape to be displayed.
	cube();

	$('#microphone').click(function(){
		/*Disconnects the source of the previous option selected. Without this, if 
		you select to play the song before checking with the microphone, the analyser will 
		be doubled up and the shape will move according to the song AND the microphone.*/

		window.source && source.disconnect(0);
		window.microphoneOn = true;

		/*If we used the Souncloud player before activating the microphone, disconnect the analyser and
		the source to avoid doubling up the data making the shape move. */
		if(SoundCloud.analyser){
			SoundCloud.soundcloudOn = false;
			SoundCloud.analyser.disconnect();
			SoundCloud.source.disconnect();
		}

		//Asks to activate the microphone and calls the function gotStream();
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;	
		navigator.getUserMedia( {audio:true}, gotStream, noStream );
	});

	$('#song').click(function(){
		window.microphoneOn = false;

		if(SoundCloud.analyser){
			SoundCloud.soundcloudOn = false;
			SoundCloud.analyser.disconnect();
			SoundCloud.source.disconnect();
		}			
		setTimeout(function(){
			playSong();
		}, 500);
	});

	$('#form').on('submit', function() {
		analyser = null;
		source.disconnect(0)
    });

  //   $('#player').click(function(){
  //   	analyser = null;
		// source.disconnect(0)
  //   });

	//Calls the cube function when clicking on the cube in the menu.
	$('#cube').click(function(){
		cube();
	});

	//Same with landscape. A the moment, this option is not in the menu anymore.
	$('#landscape').click(function(){
		landscape();
	});

	//Same with city.
	$('#city').click(function(){
		city();
	});

	//Same with sphere
	$('#sphere').click(function(){
		sphere();
	});

	//Calls the Leap Motion function that only works with the cube at the moment.
	$('#leap').click(function(){
		leap();
	});

	if (window.location.hash) {
		$(window.location.hash).trigger('click');
	}

	//When not logged in and clicked on save.
	$('#saveSettings').click(function(event){
		event.preventDefault();
		$('#login-choice').fadeIn();
	});

	$('#signup-choice').click(function(event){
		event.preventDefault();
		$('#login-choice').fadeOut();
		$('.sign-up').fadeIn();
	});

	$('#signin-choice').click(function(event){
		event.preventDefault();
		$('#login-choice').fadeOut();
		$('#sign-in-form').fadeIn();
	});

	//Handling the login with Ajax so it doesn't refresh the page.
	$('.signInButton').click(function(event){
		event.preventDefault();

		var user_email = $('#email').val();
		var user_password = $('#password').val();

		$.ajax({
			url: '/login',
			type: 'POST',
			datatype: 'json',
			data: {email : user_email, password : user_password}
		})

		.done(function(data){
			console.log(data)
			if(data){
				$('#sign-in-form').fadeOut();
				$('.menu h3').prepend('<p>' + '<a href="/logout">' + 'Sign out ' + data + '</a>' + '</p>')
				location.reload();
			} else {
				$('#sign-in-form').prepend('<p>' + 'Incorrect email or password' + '</p>')
			}
		})
	});

	$('.cancel_button').click(function(event){
		event.preventDefault();
		$('.sign-up').fadeOut();
		$('#sign-in-form').fadeOut();
	});

	$('#cancelSettings').click(function(event){
		event.preventDefault();
		$('#save-settings').fadeOut();
	});

	$('#buttonLeap').click(function(e){
	    e.preventDefault();
	    $('#errorLeap').fadeOut();
	});
});