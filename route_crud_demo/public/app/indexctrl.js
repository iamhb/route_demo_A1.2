	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : './home/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/add', {
				templateUrl : './add/add.html',
				//controller  : './add/addctrl.js'
			})

			// route for the contact page
			.when('/edit', {
				templateUrl : './edit/edit.html',
				controller  : 'editController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	scotchApp.controller('editController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});