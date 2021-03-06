function nameModel() {

	function moduloElement(array,rank) { return array[rank % array.length]; }

	// pattern: One of the patterns defined below.
	// gender: [0,1] number indicating fraction to be females.
	function getFirstName(pattern,gender,rank) {

		if (gender) {
			return moduloElement(pattern.femaleNames,rank);
		} else {
			return moduloElement(pattern.maleNames,rank);
		}

	}

	function getInitial(initialString,rank) {
		return initialString.charAt(rank % initialString.length);
	}

	this.namePatterns = {

		'USA': { 
			maleNames: [
				'Adam','Bill','Bob','Calvin','Donald','Dwight','Frank','Fred','George','Howard',
				'James','John','Jacob','Jack','Martin','Matthew','Max','Michael',
				'Paul','Peter','Phil','Roland','Ronald','Samuel','Steve','Theo','Warren','Walter','William'
			],
			femaleNames: [
				'Abigail','Alice','Allison','Amanda','Anne','Barbara','Betty','Carol','Cleo','Donna',
				'Jane','Jennifer','Julie','Martha','Mary','Melissa','Patty','Sarah','Simone','Susan'
			],
			surnames: [
				'Brady','Collins','Cooper','Davis','Donaldson','Hancock','Jones','Jacobs','Jacobson','King','Maxwell','Matthews',
				'Peters','Peterson','Rollins','Smith','Stevens','Stevenson','Williams','Williamson','Weaver',
				'Franklin','Washington','Jefferson','Adams','Jackson','Johnson','Lincoln','Grant','Fillmore',
				'Harding','Taft','Coolidge','Wilson','Truman','Nixon','Ford','Carter','Reagan','Bush','Clinton'
			],
			surnamePrefixes: [
				'Angel','Black','Brown','Copper','East','Fish','Fox','Gold','Green','Hard','King',
				'Little','Living','Long',
				'Nickel','North','Old','Peter','Red','Silver','South','Steven','West','Wil','Wolf','White','Young'
			],
			surnameSuffixes: [
				'','beck','berg','blood','fellow','ford','grant','hart','man','maker',
				'smith','son','ton','stone','weaver','well','wise','wood','wing'
			],
			makeRandomName: function(gender,rank) {
				var name = {};
				name['firstname'] 	
					= getFirstName(this,gender,rank);
				name['surname']		
					= Math.random() < 0.20
					? moduloElement(this.surnames,rank)
					: moduloElement(this.surnamePrefixes,rank)
					+ moduloElement(this.surnameSuffixes,rank);
				name['middleinitial']
					= getInitial("ABCDEFGHIJKLMNOPQRSTUVWXYZ",rank);
				name['formatted']
					= name['firstname']+' '+name['middleinitial']+'. '+name['surname']; 
				return name;
			},
			seed: function() {
				return this.surnames.length;
			}
		},

		'Spanish': { 
			maleNames: [
				'Alberto','Angel','Benito','Carlos','Domingo','Fernando',
				'Gabriel','Geraldo','Gerardo','Hernando',
				'Javiar','Jesus','Jose','Juan','Julio',
				'Mario','Martin','Mateo','Miguel','Pedro','Roberto','Raul',
				'Salvador','Sancho','Velasco','Vicente'
			],
			femaleNames: [
				'Angela','Benita','Beatriz','Carla','Donna','Dora','Gabriela','Gloria',
				'Julia','Lisa','Maria','Nana'
			],
			surnames: [
				'Alonso','Alvarez','Benitez','Blanco','Calvo','Cano','Castillo','Castro','Cruz',
				'Delgado','Diaz','Diez','Dominguez','Hernandez','Iglesias',
				'Fernandez','Garcia','Garrido','Gil','Gomez','Gonzalez','Gutierrez',
				'Jimenez','Lopez','Marin','Martin','Martinez','Medina','Molina','Morales','Moreno','Munoz',
				'Navarro','Nunez','Ortega','Ortiz','Pena','Perez','Prieto',
				'Ramirez','Ramos','Rodriguez','Romero','Rubio','Ruiz',
				'Sanz','Sanchez','Santos','Serrano','Suarez','Torres','Vazquez','Velasquez'
			],
			makeRandomName: function(gender,rank) {
				var name = {};
				name['firstname'] 	
					= getFirstName(this,gender,rank);
				name['surname']	  
					= moduloElement(this.surnames,rank);
				name['formatted']
					= name['firstname']+' '+name['surname']; 
				return name;
			},
			seed: function() {
				return this.surnames.length;
			}
		},

		'Japanese': {
			maleNames: [
				'Daichi','Daiki','Daisuke','Jun','Kaito','Kazuki','Kazuya','Kenta','Kouhei',
				'Naoki','Naoto','Ren','Riku','Ryouta','Ryuu','Shou','Shouhei','Shouta','Souta',
				'Takahiro','Takumi','Takuya','Tatsuya','Tsubasa','Yuu','Yuudai','Yuuta','Yuuto'
			],
			femaleNames: [
				'Yui','Rio','Yuna','Hina','Koharu','Hinata','Mei','Mio','Sei','Miyu','Keiko'
			],
			surnamePrefixes: [
				'Chika','Fuji','Ga','Go','Ha','Ishi','Ka','Ki','Koba','Matsu','Mura',
				'Na','Naka','Neko','Oha',
				'Sa','Saka','Taka','Wata','Yama'
			],
			surnameSuffixes: [
				'da','gawa','guchi','hara','hiro','hashi','kami','kawa','ma','mizu','moto','mura','nabe',
				'saki','ta','tou','yashi','zawa','zuki'
			],
			makeRandomName: function(gender,rank) {
				var name = {};
				name['firstname'] 	
					= getFirstName(this,gender,rank);
				name['surname']	  
					= moduloElement(this.surnamePrefixes,rank)
					+ moduloElement(this.surnameSuffixes,rank);
				name['formatted']
					= name['surname']+' '+name['firstname']; 
				return name;
			},
			seed: function() {
				return this.surnamePrefixes.length * this.surnameSuffixes.length;
			}
		},

		'German': {
			maleNames: [
				'Andreas','Bernd','Dieter','Dominik','Erik','Ernst','Franz','Hans',
				'Jan','Jens','Jonas','Jorg','Jurgen','Klaus','Lorenz','Ludwig','Lukas',
				'Markus','Niklas','Thorsten','Ulrich','Uwe','Wolfgang'
			],
			femaleNames: [
				'Angelika','Anke','Antje','Birgit','Franziska','Heike','Ines',
				'Karin','Karolin','Katja','Kerstin','Marie','Melanie','Monika','Nadine','Nicole',
				'Sabine','Silke','Simone','Stefanie','Susanne','Tanja','Ulrike','Ursula'
			],
			surnamePrefixes: [
				'Braun','Deutsch','Eisen','Engel','Fisch','Fleisch',
				'Gold','Gott','Gross','Grun','Hahn',
				'Klein','Lang','Midden',
				'Roth','Sauer','Schwarz','Schwein','Silber','Tannen','Vogel','Wolf','Weiss'
			],
			surnameSuffixes: [
				'','','bauer','baum','beck','berg','dorff','feld','haus','hardt','holz','hower','huber','jager',
				'kaiser','kramer','kruger','konig','lager','mann','merkel','peter','richter',
				'schmidt','schafer','schreiber','schneider','steiger','stein',
				'wald','walter','weber','winkel','wurst','ziegler'
			],
			makeRandomName: function(gender,rank) {
				var name = {};
				name['firstname'] 	
					= getFirstName(this,gender,rank);
				name['surname']	  
					= moduloElement(this.surnamePrefixes,rank)
					+ moduloElement(this.surnameSuffixes,rank);
				name['middleinitial']
					= getInitial("ABDEFGHIJKLMNOPRSTUVWZ",rank);
				name['formatted']
					= name['firstname']+' '+name['middleinitial']+'. '+name['surname']; 
				return name;
			},
			seed: function() {
				return this.surnamePrefixes.length * this.surnameSuffixes.length;
			}
		} // German pattern
	
	}; // namePatterns

	// member variables
	this.patternSlug = '';
	this.gender = 0.50;
	this.rank = 0;
		
}; // nameModel

nameModel.prototype = {
	
	getPatternOptions: function() {
		return Object.keys(this.namePatterns);
	},
	
	setPatternSlug: function(value) {
		//TODO validate value
		this.patternSlug = value;
	},
	
	setGender: function(value) {
		//TODO validate value - must be [0,1]
		this.gender = value;
	},
	
	setRank: function(value) {
		this.rank = value;
	},
	
	makeName: function() {
		pattern = this.namePatterns[this.patternSlug];
		return pattern.makeRandomName(this.gender,this.rank);
	}
		
}; // nameModel.prototype
