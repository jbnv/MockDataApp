// Wrapper around the Date object to add intuitive math functions
DateMath = function() {

	var internal = new Date();
	
	return {
		
		addYears: function(n) {
			internal.setYear(internal.getFullYear()+n);
		},
		
		getInternal: function() {
			return internal;
		},
		
		getDate: function() {
			return internal.getDate();
		},
		
		setDate: function(d) {
			internal.setDate(d);
		},

		setInternal: function(o) {
			internal = o;
		}
		
	}; //return

}; //DateMath

RandomDateGenerator = function() {

	//	member variables
	var minDate = new Date();
	var maxDate = new Date();
	var randomFunction = Math.random;
	
	return {
		
		setMinimum: function(value) {
			minDate = value;
		},

		setMaximum: function(value) {
			maxDate = value;
		},
		
		setRandomFunction: function(value) {
			randomFunction = value;
		},
		
		makeDate: function() {
			d = new Date();
			d.setTime(maxDate.getTime() - (maxDate.getTime()-minDate.getTime())*randomFunction());
			return d;
		}
	
	};

}