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
	username: getUsername
});

Template.games.events({
	'submit form': function(event){
		event.preventDefault();
		Meteor.call('createGame', event.target.color.value, event.target.otherPlayer.value);
	}
})
