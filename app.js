var model = {
//array with list of students, the days they attended, and did not attend
	students: ["Slappy the Frog", "Lilly the Lizard", "Paulrus the Walrus", "Gregory the Goat", "Adam the Anaconda"],
	days: 12
};

var octopus = {

//tells the view to render
	init: function () {
		view.init();
	},

	getStudents: function() {
		return model.students;
	},

	getDays: function () {
		return model.days;
	},

//sets the number of days
	setDays: function (num) {
		model.days = num;
	}
//updates the model about what has been checked

};

var view = {
//create a table with boxes to click for each student/day
	init: function() {
		//get elements from the DOM
		var bodyElem = document.querySelector('body');
		
		//make a table
		var table = document.createElement('table');
		table.id = "mainTable";
		bodyElem.appendChild(table);

		//make thead
		var tableHead = document.createElement('thead');
		//make th
		for (var i=0; i<octopus.getDays()+2; i++) {
			var th = document.createElement('th');
			tableHead.appendChild(th);
			if (i===0) {
				th.classList.add('name-col');
				th.textContent = "Student Name";
			} else if (i===octopus.getDays()+1) {
				th.classList.add('missed-col');
				th.textContent = "Days Missed-Col";
			} else {
				th.textContent = i;
			}
		}

		table.appendChild(tableHead);
		var tHeadData = document.createElement('td');

		//make tbody of table
		var tableBody = document.createElement('tbody');
		table.appendChild(tableBody);

		//make rows
		for (var j = 0; j < octopus.getStudents().length; j++) {
			var tr=document.createElement('tr');
			tableBody.appendChild(tr);
			//make td
			for (var k = 0; k <octopus.getDays()+2; k++) {
				var td = document.createElement('td');
				td.textContent='-'
				tr.appendChild(td);
			}
		}


	}

};

octopus.init();