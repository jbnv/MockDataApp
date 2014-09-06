customerApp.controller('customerController', function ($scope) {

	var dateTypes = [
		['birth','Birth Date'],
		['init','First Purchase'],
		['last','Most Recent Purchase']
	];
	
	var oPhoneTypeModel = new PhoneTypeModel();
	
	// Make columns.
	function makeColumns(){
	
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

		function makeColumnsFor1MDetail(code) {
			for (var fieldSlug in code) {
				field = code[fieldSlug];
				$scope.columns.push({ 
					title: field.data ? (field.data.title ? field.data.title : 'NO TITLE') : 'NO DATA',
					content: field.content ? field.content : function() { return 'NO CONTENT'; } 
				});
			}
		}

		makeColumnsFor1MDetail(oPhoneTypeModel);
	
	}
	makeColumns();		
	
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

			// Phone numbers.
			//TODO Add random factor.
			oPhone = {};
			for (var sType in oPhoneTypeModel) {
				oType = oPhoneTypeModel[sType];
				oPhoneNumberModel = new PhoneNumberModel();
				oPhoneNumberModel.setRank(rank);
				oPhoneNumberModel.setAreaCode('985');
				oPhone[oType.data.slug] = oPhoneNumberModel.makePhoneNumber();
				rank++;
			}
			newCustomer.phone = oPhone;
			
			// Push customer and increment.
			console.log('newCustomer',newCustomer);			
			$scope.data.push(newCustomer);
			rank++;
		}
		
		
	};

	$scope.init();
});
