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
				content: function(row) { return row.customerNumber; },
				visible: true
			},
			{
				title: 'Name',
				content: function(row) { return row.customerName.formatted; },
				visible: true,
				sort: [
					['customerName.surname','by surname A-Z'],
					['-customerName.surname','by surname Z-A'],
					['customerName.firstname','by first name A-Z'],
					['-customerName.firstname','by first name Z-A']
				]
			},
			{
				title: 'Age',
				content: function(row) { 
					now = (new Date()).getTime();
					then = row.dates.birth.getTime();
					oneYear = 1000*60*60*24*365.25;
					return Math.floor((now-then)/oneYear); 
				},
				visible: true,
				sort: [
					['-dates.birth','youngest to oldest'],
					['dates.birth','oldest to youngest']
				]
			},
			{
				title: 'Address',
				content: function(row) { return row.address; },
				visible: false
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
			sortArray = function(slug) { return [
				['-dates.'+slug,'most recent'],
				['dates.'+slug,'least recent']
			]};
			$scope.columns.push({
				title: title,
				content: rowDateFunction(slug),
				visible: false,
				sort: sortArray(slug)
			});
		}

		function makeColumnsFor1MDetail(code) {
			for (var fieldSlug in code) {
				field = code[fieldSlug];
				$scope.columns.push({ 
					title: field.data ? (field.data.title ? field.data.title : 'NO TITLE') : 'NO DATA',
					content: field.content ? field.content : function() { return 'NO CONTENT'; },
					visible: false
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
		$scope.setSort('customerName.surname');
	};
	
	$scope.setSort = function(predicate) {
		$scope.sortPredicate = predicate;
	}
	
	$scope.setNamePattern = function(slug) {
		$scope.namePattern = slug;
	}
	
	o = new nameModel();
	$scope.namePatternOptions = o.getPatternOptions();
	
	$scope.makeCustomers = function() {
	
		lAddressModel = new addressModel();
		
		// Date constants.
		dateGenerator = new RandomDateGenerator();
		oMinBirthDate = new DateMath();
		oMinBirthDate.addYears(-75);
		oMaxBirthDate = new DateMath();
		oMaxBirthDate.addYears(-18);
				
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

			// Dates
			newCustomer.dates = {};
			
			// Date of birth: Make a broad range of age between 18 and 75.
			dateGenerator.setMinimum(oMinBirthDate.getInternal());
			dateGenerator.setMaximum(oMaxBirthDate.getInternal());
			dateGenerator.setRandomFunction(function() {
				return 1-Math.exp(Math.random()-1);
			});
			newCustomer.dates.birth = dateGenerator.makeDate();
		
			// Date of first purchase: Some time between 18th birthday and now.
			o18thBirthday = new DateMath();
			o18thBirthday.setInternal(newCustomer.dates.birth);
			o18thBirthday.addYears(18);
			dateGenerator.setMinimum(o18thBirthday.getInternal());
			dateGenerator.setMaximumNow();
			newCustomer.dates.init = dateGenerator.makeDate();
			
			// Date of last purchase: Some time between first purchase and now.
			dateGenerator.setMinimum(newCustomer.dates.init);
			dateGenerator.setMaximumNow();
			newCustomer.dates.last = dateGenerator.makeDate();

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
