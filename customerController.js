customerApp.controller('customerController', function ($scope) {

	$scope.columns = {
		customerNumber : {
			title: 'Number',
			content: function(row) { return row.customerNumber; }
		},
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
		},
		address :  {
			title: 'Address',
			content: function(row) { return row.address; }
		}
	};
	
	$scope.init = function() {
		$scope.data = [];
		$scope.nameCount = 10;
		$scope.namePattern = 'USA';
	};
	
	// Generator
	$scope.nameCount = 10;
	$scope.namePattern = 'USA';
	
	$scope.makeCustomers = function() {
	
		lAddressModel = new addressModel();
	
		rank = Date.now();
		for (i = 0; i < $scope.nameCount; i++) {

			newCustomer = {
				customerNumber: rank % 1000000,
				address: lAddressModel.makeAddress(rank)
			};
			
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

	$scope.init();
});
