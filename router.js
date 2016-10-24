FlowRouter.route('/', {
	name: 'main',
	action(){
		// 1. Wat willen we tonen? 
		// 2. Welke data willen we het mee renderen?
		// 3. Waar willen we het gerenderd hebben?
		//Blaze.renderWithData(Template.layout, { child: 'main'}, document.body);

		BlazeLayout.render('layout', {child: 'main'});
	} 
});

FlowRouter.route('/users', {
	name: 'users',
	action(){
		BlazeLayout.render('layout', {child: 'users'});
	}
});

FlowRouter.route('/games', {
	name: 'games',
	action(){
		BlazeLayout.render('layout', {child: 'games'});
	}
})