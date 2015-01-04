var model = {
//array with list of students, the days they attended, and did not attend
};

var octopus = {

//tells the view to render
init: function () {
	view.init();
}
//updates the model about what has been checked

};

var view = {
//create a table with boxes to click for each student/day
	init: function() {
		//get elements from the DOM
		this.bodyElem = document.querySelecter('body');
		
		//make a table
		var table = document.createElement('table');
		table.id = "mainTable"
		table.textContent = 'hi';

		//add it to the body
		this.bodyElem.appendChild(table);

	}

};

octopus.init();