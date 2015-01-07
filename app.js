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
	days: 12
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
		// console.log('setmissed days', model.students[studentNum].attendance);
		view.render();
	},

	getMissedDays: function (studentNum, dayNum) {
		return model.students[studentNum].attendance[dayNum-1];
	},

};

var view = {
//create a table with boxes to click for each student/day
	init: function() {
		// console.log('view.init');
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
					td.classList.add('missed-col-area');
				//everything else has checkboxes
				} else {
					var input = document.createElement('input');
					input.setAttribute('type','checkbox');
					td.id='checkbox';
					
					//on click. j and k are passed in as frozen student and frozen day
					input.addEventListener('click', (function(frozenStudentJ, frozenDayK){
						return function () {
							//if that data is linked to true or false, then change it. J 0 is Slappy
							//k0, when a td, is the cell with his name. td k1 is day 0 ("day 1"). This is 
							//only run when k is not 0 and not the last td (reserved for missed-col).
							//HOWEVER, when running octopus.get/setMissedDays, we are then looking at K
							//in terms of the attendance. This is where the off by 1 happens. k0 in the
							//attendance is day 0. k1 as a td is day 0, but as attendance is day 1. Therefore
							//I need to subtract 1 when checking the attendance.
							if (octopus.getMissedDays(frozenStudentJ, frozenDayK)===true) {
								// console.log(studentList[frozenStudentJ].name, frozenDayK, 'CLICK returned true, change to false');
								octopus.setMissedDays(frozenStudentJ, frozenDayK, false);
							} else if (octopus.getMissedDays(frozenStudentJ, frozenDayK)===false) {
								// console.log(studentList[frozenStudentJ].name, frozenDayK, 'CLICK returned false, change to true');
								octopus.setMissedDays(frozenStudentJ, frozenDayK, true);
							} else {
								// this is happeneing on collum 6 ("day 5")
								// console.log('something else happened.');
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
		// console.log('view.render');
		var studentList = octopus.getStudents();
		var numDays = octopus.getDays();
		//node list of all trs
		var trElemList = this.table.querySelectorAll('tr');
		//node list of all .missed-col
		var missedDaysElem = this.table.querySelectorAll('.missed-col-area');
		
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
			for (var j=0; j<numDays; j++) {
				//get the specific day (node) (td element), for that student
				var dayElem = checkboxElemList[j];
				var dayIsChecked = octopus.getMissedDays(i, j+1);
				//get the input element for that td
				var checkbox = dayElem.querySelector('input');
				// console.log('j is ' + j + ' and checked should be ' + dayIsChecked, dayElem, checkbox);
				//check the box if that box is stored as checked in the model
				checkbox.checked = dayIsChecked;
				
				// add to counter of missed days
				// console.log(dayIsChecked);
				if (dayIsChecked === true ) {
					count++;
					// console.log(count);
				}
			}
			// console.log('student attendance for', studentList[i].name, studentList[i].attendance);
			missedDaysElem[i].textContent = count;
			// console.log(count);
		}
	}
};

octopus.init();