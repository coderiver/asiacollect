$(document).ready(function() {
	$(document).on('click', function() {
		$('.js-menu').removeClass('is-open');
		$('.js-callback').removeClass('is-open');
	});

	// slider
	$('.js-slider').slick();

	//open-popup
	$('.js-open-popup').on('click', function() {
		var link = $(this).data('link');
		var popup = $('.js-popup[data-popup="' + link + '"]');

		popup.addClass('is-open');
		return false;
	});

	//close-popup
	$('.js-close-popup').on('click', function() {
		var popup = $(this).parents('.js-popup');

		popup.removeClass('is-open');
		return false;
	});

	// menu
	$('.js-open-menu').on('click', function(e) {
		$('.js-menu').addClass('is-open');

		return false;
	});

	$('.js-menu').on('click', function(e) {
		e.stopPropagation();
	});

	// nav
	$('.js-menu-link').on('click', function(){
		var link = $(this).attr('href');
		var height = $('.header').outerHeight();
		$('html, body').animate({
			scrollTop: $(link).offset().top - height
		}, {
			duration: 500,
			easing: "easeInOutCubic"
		},
			$('.js-menu').removeClass('is-open')
		);

		return false;
	});

	//open callback
	$('.js-open-callback').on('click', function() {
		$('.js-callback').addClass('is-open');

		return false;
	});
	$('.js-callback').on('click', function(e) {
		e.stopPropagation();
	});
	// form validation
	(function() {
		var popup   = $('.js-popup'),
			thanks  = $('.js-thanks-popup'),
			body    = $('body');
		// welcome
		$.validate({
			form: '#popup-form',
			onSuccess: function() {
				post_data = {
					'name': $('#popup-form input[name=name]').val(),
					'tel': $('#popup-form input[name=tel]').val()
				};
				// Ajax post data to server
				$.post('send.php', post_data, function(response) {
					if (response.type == 'error') {
						console.log('error');
					}
					else {
						// reset values in all input fields
						popup.removeClass('is-open');
						thanks.addClass('is-open');
						$('#popup-form').get(0).reset();
						setTimeout(function() {
							thanks.removeClass('is-open');
						}, 2000);
					}
				}, 'json');
				return false;
			}
		});
		// footer
		$.validate({
			form : '#form',
			onSuccess: function() {
				post_data = {
					'name': $('#form input[name=name]').val(),
					'tel': $('#form input[name=tel]').val(),
					'comment': $('#form textarea[name=comment]').val()
				};
				// Ajax post data to server
				$.post('send.php', post_data, function(response) {
					if (response.type == 'error') {}
					else {
						thanks.addClass(500);
						$('#form').get(0).reset();
						setTimeout(function() {
							thanks.removeClass('is-open');
						}, 2000);
					}
				}, 'json');
				return false;
			}
		});
	}());

});