addressModel = function() {

	function moduloElement(array,rank) { return array[rank % array.length]; }

	// There are three ways to get a street name:

	var ordinalNames = [
		'First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth','Ninth','Tenth','Eleventh','Twelfth'
	];
	
	var treeNames = [
		'Ash','Beech','Birch','Cypress','Elm','Evergreen','Fir','Linden',
		'Magnolia','Myrtle','Oak','Pine','Sycamore','Willow'
	];
	
	// The third is to take a US surname from the surname model.
	var localNameModel = new nameModel();
	localNameModel.setPatternSlug('USA');
	
	function getName(rank) {
		factor = 5;
		switch (rank % factor) {
			case 0: 
				return moduloElement(ordinalNames,rank)
			case 1: 
				return moduloElement(treeNames,rank)
			default:
				localNameModel.setRank(rank);
				return localNameModel.makeName().surname;
		}
	}

	var streetTypes = [
		'Avenue','Boulevard','Drive','Lane','Road','Street','Trace','Trail'
	];
	
	// member variables
	var rank = 0;
	
	return {
		
		setRank: function(value) {
			rank = value;
		},
		
		makeAddress: function(rank) {
			houseNumber	
				= Math.floor(Math.pow(10,2+Math.random()*4-Math.random()*2));
			streetName
				= getName(rank);
			streetType
				= moduloElement(streetTypes,rank);
			return ''+houseNumber+' '+streetName+' '+streetType;
		},
		
	}; // return object
	
}; // nameModel

