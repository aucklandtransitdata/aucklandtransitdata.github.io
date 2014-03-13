var $ = require('jquery')/*,
	ko = require('knockout'),
	Sammy = require('Sammy');*/

$(function () {

	var $mobilemenu = $('#mobilemenu');

	// mobile menu
	$mobilemenu.click(function () {
		$('body').toggleClass('mobilemenu');
		return false;
	});

	var isMobile = false;

	$(window).on('hashchange', function () {

		$('body').removeClass('mobilemenu');
	});

	$(window).on('resize', function () {
		$('body').removeClass('mobilemenu');

		var width = $(window).width();

		if (width < 768) {
			isMobile = true;
			//$.data(this, 'scrollTimer', setTimeout(function() {
				$mobilemenu.fadeIn(250);
			//}, 250));
		} else {
			isMobile = false;
			$mobilemenu.fadeOut(0);
		}

		//console.log('isMobile: ' + isMobile);
	});

	$(window).resize();

	$('section').each(function () {
		$(this).append('<div class="clear" />');
	});

	//$mobilemenu.show(1000);

	$(window).on('scroll', function () {

		if (isMobile) {
			$mobilemenu.fadeOut(0);

			clearTimeout($.data(this, 'scrollTimer'));

			$.data(this, 'scrollTimer', setTimeout(function() {
				$mobilemenu.fadeIn(250);
			}, 250));
		}
	});

	/*function PagesViewModel() {
		// Data
		var self = this;
		self.pages = [
			'Team',
			'Registration',
			'Reference Sites',
			'Challenges',
			'Event Agenda',
			'Resources'
		];
		self.chosenPageId = ko.observable();

		// Behaviours    
		self.goToPage = function(page) {
			location.hash = page;
		};

		Sammy(function() {
			this.get('#:page', function() {
				self.chosenPageId(this.params.folder);
			});
		});
	};

	ko.applyBindings(new PagesViewModel());*/
});