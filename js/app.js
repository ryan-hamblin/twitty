$(document).ready(function(){
	//hide the char count and the tweet controls elem on page load.
	$('.tweet-controls, #char-count, #tweet-submit').hide();
	//When someone clicks on the text area it should grow in size (almost double the height and show the tweet button and the char count.)
	$('.tweet-compose').on('click', function(){
		$(this).animate({height: "5em"}, 500);
		$('.tweet-controls, #char-count, #tweet-submit').show();
	});
	// STEP 3: As the user types the character count should decrease. Once it hits 10 character or less the count should turn red HINT: jQuery keypress events (keypress, keydown, keyup, etc) It should also max out at 140 charicters and turn red when it does and not allow you to enter any more char.
	var maxCharacters = 140;
	$('#char-count').text(maxCharacters); // text modifies what is in the char-count box
	$('.tweet-compose').on('keyup', function() { // keyup is each keystroke
    	var count = $('#char-count');
    	var characters = $(this).val().length;  // val() gives value but not numbers thus the use of length
    
    	if (characters > maxCharacters) { // the length of what i type less than 140 maxchars
        	count.addClass('over');  // adds the class to change font to red
        	$('.button').attr('disabled', 'disabled');  //difference from prop('disabled')??
        	$('#char-count').css({color: "red"}, 140)

      	} else {
        	count.removeClass('over');
        	$('.button').removeAttr('disabled'); // gives my tweet button back
        	$('#char-count').css({color: "#999"}, 140);

    	}
    
    	count.text(maxCharacters - characters);
	});

	$('#tweet-submit').on("click", function() {
		var tweet = $('#newTweet').clone(true);
		var avImg = $('#profile-summary .avatar').attr('src');
		var fullName = $('#profile-summary p').html();

		tweet.removeAttr('id');
		tweet.css({display: 'block'});
		$('#stream').prepend(tweet);
		$('#newTweetText').text($('.tweet-compose').val());
		$('.tweet:first .avatar').attr('src', avImg);
		$('.tweet:first .fullname').html(fullName);
		$('.tweet:first .username').html('@ryanlhamblin');
		$('.tweet-compose').val('');
		$('.tweet-compose').animate({height: "3em"}, 500); 
		$('#tweet-controls').hide();
	})
	$('.tweet').find('.tweet-actions').hide();

	$('.tweet').hover(
		function() {
			$(this).find('.tweet-actions')
			.show()
			.slideDown({height: 25}, 400);
		}, function() {
			$(this).find('.tweet-actions')
			.slideUp(400);
		}
	);

	$('.tweet').find('.stats').hide();
	var showStats = false;
	$('.tweet').click(function() {
		if(showStats == false) {
			$(this).find('.stats')
			.slideDown({height: 75}, 500);
			showStats = true;
		} else {
			$(this).find('.stats')
			.slideUp(500);
			showStats = false;
		}
	});

	$('div.stats').hide();

	$('div.tweet').on("click", function() {
		$('div.stats').toggle();
	})

});