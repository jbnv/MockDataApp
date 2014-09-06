PhoneTypeModel = function() {

	var oType = new CodeObject();
	oType.slug = 'phone',
	oType.dataSlugs = [ 'slug', 'rate', 'title' ];
	oType.data = [
		[ 'mobile',0.80,'Mobile Number' ],
		[ 'home'  ,0.60,'Home Number' ],
		[ 'work'  ,0.60,'Work Number' ],
		[ 'fax'   ,0.10,'Fax Number' ]
	];
	return oType.transform();
	
};

PhoneNumberModel = function() {

	// member variables
	var rank = 0;
	var areaCode = '555';
	
	return {
	
		setRank: function(value) {
			rank = value;
		},
		
		setAreaCode: function(value) {
			areaCode = value;
		},
		
		makePhoneNumber: function() {
			prefix = 201 + (rank * 619) % 798;
			suffix = (rank * 3579) % 10000;
			return '+1-'+areaCode+'-'+prefix+'-'+("0000"+suffix).substr(-4,4);
		}
		
	}; // return object

}