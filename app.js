var model = {
//array with list of students, the days they attended, and did not attend
	init: function () {
		this.students = [];
		for (var i=0; i<this.studentNames.length; i++) {
			var student = {
				name: this.studentNames[i],
				attendance: []
			};
			for (var j=0; j<this.days; j++) {
				student.attendance.push(false);
			}
			this.students.push(student);
		}
		console.log(this.students);
	},

	studentNames: ["Slappy the Frog", "Lilly the Lizard", "Paulrus the Walrus", "Gregory the Goat", "Adam the Anaconda"],
	days: 4
};

var octopus = {

	//tells the view to render
	init: function () {
		model.init();
		view.init();
	},

	getStudents: function() {
		return model.students;
	},

	getDays: function () {
		return model.days;
	},

	setDays: function (num) {
		model.days = num;
	},

	setMissedDays: function (studentNum, dayNum) {
		console.log(model.students[studentNum]);
		model.students[studentNum].attendance[dayNum-1]=true;
		console.log(model.students[studentNum].attendance);
	},

	getMissedDays: function (studentNum) {
		return model.students[studentNum].attendance;
	},

	daysMissed: function(num) {
		console.log('hiiii');
	}
//updates the model about what has been checked

};

var view = {
//create a table with boxes to click for each student/day
	init: function() {
		//get elements from the DOM
		var bodyElem = document.querySelector('body');

		//get element from octopus
		var studentList = octopus.getStudents();

		//make a table
		this.table = document.createElement('table');
		this.table.id = "mainTable";
		bodyElem.appendChild(this.table);

		//make thead
		var tableHead = document.createElement('thead');
		//make th
		for (var i=0; i<octopus.getDays()+2; i++) {
			var th = document.createElement('th');
			tableHead.appendChild(th);
			if (i===0) {
				th.classList.add('name-col');
				th.textContent = 'Student Name';
			} else if (i===octopus.getDays()+1) {
				th.classList.add('missed-col');
				th.textContent = 'Days Missed-Col';
			} else {
				th.textContent = i;
			}
		}
		this.table.appendChild(tableHead);
		var tHeadData = document.createElement('td');

		//make tbody of table
		var tableBody = document.createElement('tbody');
		this.table.appendChild(tableBody);

		//make rows
		for (var j = 0; j < studentList.length; j++) {
			var tr=document.createElement('tr');
			tr.classList.add('students');
			tableBody.appendChild(tr);
			//make td
			for (var k = 0; k <octopus.getDays()+2; k++) {
				var td = document.createElement('td');
				tr.appendChild(td);
				//add student's name
				if (k===0) {
					td.classList.add('name-col');
					td.textContent = studentList[j].name;
				//add end section
				} else if (k===octopus.getDays()+1) {
					td.classList.add('missed-col');
					td.textContent = octopus.daysMissed();
				//everything else has checkboxes
				} else {
					var input = document.createElement('input');
					input.setAttribute('type','checkbox');
					
					//on click, 
					input.addEventListener('click', (function(frozenStudent, frozenDay){
						return function () {
							console.log('function', frozenStudent+" "+frozenDay);
							octopus.setMissedDays(frozenStudent, frozenDay);
						};
					})(j,k), false);
					td.appendChild(input);
				}
			}
		}
	},
	
	render: function () {
		var studentList = octopus.getStudents();
		var dayList = octopus.getDays();
		var trElemList = this.table.querySelectorAll('tr');
		//go over every student
		for (var i=0; i<studentList.length; i++) {
			var student = studentList[i];
			var trElem = trElemList[i];
			//access all tds in the trElem
			var tdElemList = trElem.querySelectorAll('td');
			
			
			//go over days for that specific student
			for (var j=0; j<dayList; j++) {
				//get the specific day (td element), for that student
				var dayElem = tdElemList[j+1];
				//get the input element for that td
				var checkbox = dayElem.querySelector('input');
				//test: update the data with what is in the model
				// dayElem.textContent = octopus.getMissedDays(i)[j];
				//test: check the first input in trElem
				console.log(i,j);
				checkbox.checked = true;
			}
		}
	}
};

octopus.init();
view.render();