var $ = require('jquery'),
	ko = require('knockout'),
	Sammy = require('Sammy');

$(function () {

	// mobile menu
	$('#mobilemenu').click(function () {
		$('body').toggleClass('mobilemenu');
		return false;
	});

	function PagesViewModel() {
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

	ko.applyBindings(new PagesViewModel());
});