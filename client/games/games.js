Template.games.onCreated(function(){
	// check voor subscription
	this.subscribe('games');
	this.subscribe('users');
});

Template.games.helpers({
	possibleOpponents: function(){
		var user = Meteor.user();
		var friends = user.profile.friends || [];


		Games.find({ result: null }).forEach(function(game){
			var color 	= (game.w === user._id) ? 'b' : 'w';
			var idx		= friends.indexOf(game[color]);

			// als game voor komt in array, id verwijderen van lijst
			if (idx > -1) friends.splice(idx, 1);
		});


		// bool maken van user.find dmv .lenght
		return friends.length ? Meteor.users.find({ _id: { $in: friends }}) : null;
	},
	currentGames: function(){
		return Games.find({ result: null });
	},
	archivedGames: function(){
		return Games.find({ result: { $not: null } }).map(function(game){
			if(game.result !== 'draw') game.result = getUsername(game.result) + ' heeft gewonnen';
			return game;
		});
	},
	username: getUsername,
	byMe: function(){
		return this.needsConfirmation && this.needsConfirmation === Meteor.userId();
	},
	opponent: function(){
		return (this.w === Meteor.userId()) ? this.b : this.w;
	}
});

Template.games.events({
	'submit form': function(event){
		event.preventDefault();
		Meteor.call('createGame', event.target.color.value, event.target.otherPlayer.value);
	},
	'click #accept': function(event){
		Meteor.call('acceptGame', this._id);
	},
	'click #decline': function(event){
		Meteor.call('declineGame', this._id);
	}
});

