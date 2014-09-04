customerApp.controller('customerController', function ($scope) {

	$scope.data = [];
	
	$scope.columns = {
		firstName : {
			title: 'First Name',
			content: function(row) { return row.customerName.firstname; }
		},
		middleInitial : {
			title: 'MI',
			content: function(row) { return row.customerName.middleinitial; }
		},
		surname :  {
			title: 'Surname',
			content: function(row) { return row.customerName.surname; }
		}
	};
	
	$scope.init = function() {
		$scope.data = [];
	};
	
	// Generator
	$scope.nameCount = 10;
	$scope.namePattern = 'USA';
	
	$scope.makeCustomers = function() {
		rank = Date.now();
		for (i = 0; i < $scope.nameCount; i++) {

			newCustomer = {};
			
			// Name
			model = new nameModel();
			model.setPatternSlug($scope.namePattern);
			model.setRank(rank);
			model.setGender((rank % $scope.nameCount) / $scope.nameCount);
			newCustomer.customerName = model.makeName();
			
			$scope.data.push(newCustomer);
			rank++;
		}
	};

	$scope.makeCustomers(); //TEMP
});
