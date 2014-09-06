CodeObject = function() {

	return {
	
		slug: '',
		
		toStringFunction: function(s) { return s; },
	
		dataSlugs:  [], // array of slugs for fields in order
		
		data: [], // array of arrays of data
		
		// The end result of transform is an object with each attribute as follows:
		// fieldSlug: { 
		//	data: {dataSlug: data[dataSlug] }, 
		//	column: { 'slug': fieldSlug, 'title': fieldTitle, 'content': transform function }
		// }
		
		transform: function() {
			oAllFields = [];
			for (var dataRowIndex in this.data) {
				// Make data.
				oThisFieldData = {};
				for (var fieldIndex in this.dataSlugs) {
					oThisFieldData[this.dataSlugs[fieldIndex]] = this.data[dataRowIndex][fieldIndex];
				}
				// Make final field object
				contentFunction = function(codeSlug,fieldSlug,toStringFunction) {
					return function(pRow) { 
						o = pRow[codeSlug][fieldSlug];
						console.log("content: pRow["+codeSlug+"]["+fieldSlug+"]",o);
						return o ? toStringFunction(o) : null;
					}
				}
				oAllFields[oThisFieldData.slug] = {
					data: oThisFieldData,
					content: contentFunction(this.slug,oThisFieldData.slug,this.toStringFunction)
				};
			} // dataRowIndex
			return oAllFields;
		}, //transform

	}

}