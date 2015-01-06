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
	},

	studentNames: ["Slappy the Frog", "Lilly the Lizard", "Paulrus the Walrus", "Gregory the Goat", "Adam the Anaconda"],
	days: 5
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

	setMissedDays: function (studentNum, dayNum, tf) {
		model.students[studentNum].attendance[dayNum-1]=tf;
		console.log('setmissed days', model.students[studentNum].attendance);
		view.render();
	},

	getMissedDays: function (studentNum) {
		return model.students[studentNum].attendance;
	},

};

var view = {
//create a table with boxes to click for each student/day
	init: function() {
		console.log('view.init');
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

		//make rows representing students
		for (var j = 0; j < studentList.length; j++) {
			var theStudent = studentList[j];
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
					td.textContent = theStudent.name;
				//add end section
				} else if (k===octopus.getDays()+1) {
					td.classList.add('missed-col');
					td.id='missed-col';
				//everything else has checkboxes
				} else {
					var input = document.createElement('input');
					input.setAttribute('type','checkbox');
					td.id='checkbox';
					
					//on click. j and k are passed in as frozen student and frozen day
					input.addEventListener('click', (function(frozenStudent, frozenDay){
						return function () {
							//if that row is linked to true or false, then change it. -1 because day 2 is linked to day cell 1 (cells start at 0)
							if (octopus.getMissedDays(frozenStudent)[frozenDay-1]===true) {
								console.log('CLICK was true, change to false', studentList[frozenStudent].name, frozenDay);
								octopus.setMissedDays(frozenStudent, frozenDay, false);
							} else {
								console.log('CLICK was false, change to true');
								octopus.setMissedDays(frozenStudent, frozenDay, true);
							}
						};
					})(j,k), false);
					td.appendChild(input);
				}
			}
		}
		view.render();
	},
	
	render: function () {
		console.log('view.render');
		var studentList = octopus.getStudents();
		var dayList = octopus.getDays();
		//node list of all trs
		var trElemList = this.table.querySelectorAll('tr');
		//node list of all .missed-col
		var missedDaysElem = this.table.querySelectorAll('#missed-col');
		
		//go over every student
		for (var i=0; i<studentList.length; i++) {
			var trElem = trElemList[i];
			//access a node (acts sort of like an array) list of all checkboxes
			var checkboxElemList = trElem.querySelectorAll('#checkbox');
			//make a counter
			var count = 0;
			
			//update the checkboxes
			//go over days for that specific student. Daylist is the number of days ex. 3.
			//dayElem takes from a node list of all checkboxes. It selects ??
			for (var j=0; j<dayList; j++) {
				//get the specific day (node?) (td element), for that student
				var dayElem = checkboxElemList[j];
				console.log(j, dayElem);
				//get the input element for that td
				var checkbox = dayElem.querySelector('input');
				//check the box if that box is stored as checked in the model
				checkbox.checked = octopus.getMissedDays(i)[j];
				
				//add to counter of missed days
				var studentAttendance = octopus.getMissedDays(i);
				console.log(studentAttendance);
				if (studentAttendance[i] === false ) {
					count++;
					console.log(count);
					console.log('student attendance for', studentList[i].name, studentList[i].attendance);
				}
			}
			missedDaysElem[i].textContent = count;
			console.log(count);
		}
	}
};

octopus.init();