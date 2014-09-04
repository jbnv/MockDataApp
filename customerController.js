customerApp.controller('customerController', function ($scope) {

	$scope.columns = [
		{
			title: 'Number',
			content: function(row) { return row.customerNumber; }
		},
		{
			title: 'Name',
			content: function(row) { return row.customerName.formatted; }
		},
		{
			title: 'Address',
			content: function(row) { return row.address; }
		}
	];

	var dateTypes = [
		['birth','Birth Date'],
		['init','First Purchase'],
		['last','Most Recent Purchase']
	];
	
	for (var i in dateTypes) {
		dateType = dateTypes[i];
		slug     = dateType[0];
		title    = dateType[1];
		rowDateFunction = function(slug) { return function(row) { 
			o = row.dates[slug];
			return o ? o.toDateString() : null; 
		}};
		$scope.columns.push({
			title: title,
			content: rowDateFunction(slug)
		});
	}
	
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
	
		// Date of birth: Make a broad range of age between 18 and 75.
		oMinBirthDate = new DateMath();
		oMinBirthDate.addYears(-75);
		oMaxBirthDate = new DateMath();
		oMaxBirthDate.addYears(-18);
		lBirthDateGenerator = new RandomDateGenerator();
		lBirthDateGenerator.setMinimum(oMinBirthDate.getInternal());
		lBirthDateGenerator.setMaximum(oMaxBirthDate.getInternal());
		lBirthDateGenerator.setRandomFunction(function() {
			return Math.exp(Math.random()-1);
		});
			
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

			newCustomer.dates = {
				birth: lBirthDateGenerator.makeDate()
			};
			
			// Push customer and increment.
			$scope.data.push(newCustomer);
			rank++;
		}
	};

	$scope.init();
});
