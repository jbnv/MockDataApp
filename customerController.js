customerApp.controller('customerController', function ($scope) {

	$scope.data = [
		{ firstName: 'Sidney', middleInitial: 'J', surname: 'Bienvenu' }
	];
	
	$scope.columns = {
		firstName : {
			title: 'First Name',
			content: function(row) { return row.firstName; }
		},
		middleInitial : {
			title: 'MI',
			content: function(row) { return row.middleInitial; }
		},
		surname :  {
			title: 'Surname',
			content: function(row) { return row.surname; }
		}
	};
	
	$scope.init = function() {
		$scope.data = [];
	};
	
	$scope.makeCustomer = function() {
		newCustomer = null; //TODO
		$scope.data.push(newCustomer);
	};


});
