/**
 * Class for creating autocomplete input box
 * @class
 **/
 BillingTracker.Calendar = function() {
		
};

BillingTracker.Calendar.prototype = {

/**
 * Hide the div calendar
 * @function
 * @name Calendar#removeCalendarTable
 * 
 * @param {string} divCalendarId the calendar div id
 **/
removeCalendarTable: function(divCalendarId) {
	
	document.getElementById(divCalendarId).innerHTML = "";

},

/*
documentOnclick: function(e, divCalendarId) {

	var calendarId = document.getElementById(divCalendarId);
	
	if(e.target.id == "" && e.target.id != "back" && e.target.id != "forward") {
		calendarId.style.display = "none";
	}

},
*/

/**
 * Position the calendar div in line with the calendar input box
 * @function
 * @name Calendar#positionCalendar
 * 
 * @param {string} inputCalendarId the calendar input box
 * @param {string} divCalendarId the calendar div id
 **/
positionCalendar: function(inputCalendarId, divCalendarId) {	
		
	var positionInputCalendar = document.getElementById(inputCalendarId);
	
	var left = positionInputCalendar.offsetLeft;
	var top = positionInputCalendar.offsetTop;
	
	var positionDivCalendar = document.getElementById(divCalendarId);
	
	positionDivCalendar.style.left = left;
	positionDivCalendar.style.top = top + positionInputCalendar.offsetHeight;
	
},

/**
 * Create the calendar table
 * @function
 * @name Calendar#createCalendarTable
 * 
 * @param {string} inputCalendarId the calendar input box
 * @param {string} divCalendarId the calendar div id
 * @param {function} moveCalendar moves direction of the calendar div month forward or month backward
 * @param {Array} monthsArray array holding the string months
 **/
createCalendarTable: function(inputCalendarId, divCalendarId, moveCalendar, monthsArray) {
		
	var tbl = document.createElement("table");
	tbl.id = "tableCalendarId";
	tbl.className = "calendar";
	
	var row = document.createElement("tr");
	
	row.className = "calendarHover";
	
	var cell = document.createElement("td");
	cell.id = "back";
	cell.style.textAlign = "center";
	cell.style.cursor = "pointer";
	cell.onclick = function() { moveCalendar('back', cell, inputCalendarId, divCalendarId, monthsArray); };
	cellText = document.createTextNode("<");
	
	cell.appendChild(cellText);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	cell.id = "monthYear";
	cell.colSpan = "5";
	cell.style.textAlign = "center";
	cell.style.padding = "10px";
	cell.style.fontSize = "16px";
	cell.style.fontWeight = "bold";
	
	row.appendChild(cell);
	
	cell = document.createElement("td");
	cell.id = "forward";
	cell.style.textAlign = "center";
	cell.style.cursor = "pointer";
	cell.onclick = function() { moveCalendar('forward', cell, inputCalendarId, divCalendarId, monthsArray); };
	cellText = document.createTextNode(">");		
	
	cell.appendChild(cellText);
	row.appendChild(cell);
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	header = document.createElement("th");
	header.id = "cal_cell_h1";
	headerText = document.createTextNode("S");
	header.className = "calendar";
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h2";
	headerText = document.createTextNode("M");
	header.className = "calendar";
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h3";
	headerText = document.createTextNode("T");
	header.className = "calendar";
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h4";
	headerText = document.createTextNode("W");
	header.className = "calendar";
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h5";
	headerText = document.createTextNode("T");
	header.className = "calendar";
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h6";
	headerText = document.createTextNode("F");
	header.className = "calendar";
	
	header.appendChild(headerText);
	row.appendChild(header);
	
	header = document.createElement("th");
	header.id = "cal_cell_h7";
	headerText = document.createTextNode("S");
	header.className = "calendar";
	
	header.appendChild(headerText);
	row.appendChild(header);
		
	tbl.appendChild(row);	
	
	row = document.createElement("tr");
	
	for(i=1; i<=7; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		cell.style.cursor = "pointer";
		cell.style.padding = "4px";
		cell.style.textAlign = "center";
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=8; i<=14; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		cell.style.cursor = "pointer";
		cell.style.padding = "4px";
		cell.style.textAlign = "center";		
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");

	for(i=15; i<=21; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		cell.style.cursor = "pointer";
		cell.style.padding = "4px";
		cell.style.textAlign = "center";		
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=22; i<=28; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		cell.style.cursor = "pointer";
		cell.style.padding = "4px";
		cell.style.textAlign = "center";		
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=29; i<=35; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		cell.style.cursor = "pointer";
		cell.style.padding = "4px";
		cell.style.textAlign = "center";		
		row.appendChild(cell);
	}
	
	tbl.appendChild(row);
	
	row = document.createElement("tr");
	
	for(i=36; i<=42; i++)
	{
		cell = document.createElement("td");
		cell.id = "cal_cell_" + i;
		cell.style.cursor = "pointer";
		cell.style.padding = "4px";
		cell.style.textAlign = "center";		
		row.appendChild(cell);
	}	
	
	tbl.appendChild(row);
	
	var calendarId = document.getElementById(divCalendarId);
	
	calendarId.appendChild(tbl);
	
},

/**
 * Show or hide the calendar div
 * @function
 * @name Calendar#showHideCalendar
 * 
 * @param {string} showOrHide either show or hide the calendar
 * @param {string} inputCalendarId the calendar input box
 * @param {string} divCalendarId the calendar div id
 * @param {Array} monthsArray array holding the string months
 **/
showHideCalendar: function(showOrHide, inputCalendarId, divCalendarId, monthsArray) {
	
	var calendarId = document.getElementById(divCalendarId);	
	
	if(showOrHide == "show")
	{		
		if(this.validateDate(inputCalendarId) == false)
		{
			calendarId.style.display = "none";
			return;
		}
	}

	var calendarId = document.getElementById(divCalendarId);
		
	this.positionCalendar(inputCalendarId, divCalendarId);
	
	if(showOrHide == "show")
	{
		calendarId.style.display = "block";
	}
	else
	if(showOrHide == "hide")
	{
		calendarId.style.display = "none";
		return;
	}
	
	var inputCalendar = document.getElementById(inputCalendarId);
	
	this.removeCalendarTable(divCalendarId);
	this.createCalendarTable(inputCalendarId, divCalendarId, this.moveCalendar, monthsArray);	
		
	if(inputCalendar.value != "")
	{	
		this.calendar(this.getInputCalendarValue("month", inputCalendarId, monthsArray),this.getInputCalendarValue("year", inputCalendarId, monthsArray), inputCalendarId, divCalendarId, monthsArray);
	}
	else
	{
		var calendarDate = new Date();
		
		this.calendar(calendarDate.getMonth(), calendarDate.getFullYear(), inputCalendarId, divCalendarId, monthsArray);
	}

},

/**
 * Validate the date in format dd-mmm-yyyy given calendar input box id
 * @function
 * @name Calendar#validateDate
 * 
 * @param {string} inputCalendarId the calendar input box to validate
 **/
validateDate: function(inputCalendarId)
{
	var regularExpressionValidation = /^(0[0-9]|1[0-9]|2[0-9]|3[0-1])\-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\-\d{4}$/g;

	inputCalendarObject = document.getElementById(inputCalendarId);

	if(inputCalendarObject.value != "")
	{
		if(!inputCalendarObject.value.match(regularExpressionValidation))
		{
			return false;
		}
		else
		{			
			return true;
		}
	}
},

/**
 * Validate the date in format dd-mmm-yyyy given date string from system
 * @function
 * @name Calendar#validateDateFromString
 * 
 * @param {string} dateString date in string format to validate
 **/
validateDateFromString: function(dateString)
{
	var regularExpressionValidation = /^(0[0-9]|1[0-9]|2[0-9]|3[0-1])\-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\-\d{4}$/g;

	if(dateString != "")
	{
		if(!dateString.match(regularExpressionValidation))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
},

/**
 * Get the day, month, or year of the calendar input box date value
 * @function
 * @name Calendar#getInputCalendarValue
 * 
 * @param {string} dayMonthOrYear to get the day, month, or year
 * @param {string} inputCalendarId the calendar input box
 * @param {Array} monthsArray array holding the string months
 **/
getInputCalendarValue: function(dayMonthOrYear, inputCalendarId, monthsArray) {
	
	var inputCalendar = document.getElementById(inputCalendarId);
	
	if(inputCalendar.value == "")
		return "";
	
	var day, month, year;
	
	var inputCalendarArray = inputCalendar.value.split('-');
	
	day = inputCalendarArray[0];
	if(day.substr(0,1) == '0')
		day = day.substr(1,day.length)
	
	for(i=0; i<12; i++)
	{
		if(inputCalendarArray[1] == monthsArray[i].substr(0,3).toLowerCase())
			break;
	}
	
	month = i;
	
	year = inputCalendarArray[2];
	
	if (day == "" || month == 12 || year == "")
		return "";
	
	if(dayMonthOrYear == "day")
	{
		return day;
	}
	else if(dayMonthOrYear == "month")
	{
		return month;
	}
	else if(dayMonthOrYear == "year")
	{
		return year;
	}
	else 
	{
		return "";
	}
},

/**
 * Populate month array which holds the string months.
 * @function
 * @name Calendar#populateMonthsArray
 **/
populateMonthsArray: function() {

	monthsArray = new Array();
	
	monthsArray[0] = "Jan";
	monthsArray[1] = "Feb";
	monthsArray[2] = "Mar";
	monthsArray[3] = "Apr";
	monthsArray[4] = "May";
	monthsArray[5] = "Jun";
	monthsArray[6] = "Jul";
	monthsArray[7] = "Aug";
	monthsArray[8] = "Sep";
	monthsArray[9] = "Oct";
	monthsArray[10] = "Nov";
	monthsArray[11] = "Dec";	
	
	/*
	monthsArray[0] = "January";
	monthsArray[1] = "February";
	monthsArray[2] = "March";
	monthsArray[3] = "April";
	monthsArray[4] = "May";
	monthsArray[5] = "Jun";
	monthsArray[6] = "July";
	monthsArray[7] = "August";
	monthsArray[8] = "September";
	monthsArray[9] = "October";
	monthsArray[10] = "November";
	monthsArray[11] = "December";
	*/
	
	return monthsArray;
	
},

/**
 * The main calendar function
 * @function
 * @name Calendar#calendar
 * 
 * @param {string} month the month to display
 * @param {string} year the year to display
 * @param {string} inputCalendarId the calendar input box
 * @param {string} divCalendarId the calendar div id
 * @param {Array} monthsArray array holding the string months
 **/
calendar: function(month, year, inputCalendarId, divCalendarId, monthsArray) {
		
	this.clearCalendar();

	var calendarDate = new Date();
				
	calendarDate.setDate(1);
	calendarDate.setMonth(month);
	calendarDate.setFullYear(year);
	
	document.getElementById('monthYear').innerHTML = monthsArray[month] + ' ' + year;
	
	var days = this.daysInMonth(calendarDate.getMonth() + 1, calendarDate.getFullYear());
	var calendarDayStart = calendarDate.getDay();
	
	var calendarDayEnd;
	
	for(i=1; i<days+1; i++)
	{
		intCalCell = i + parseInt(calendarDayStart);
		document.getElementById('cal_cell_' + intCalCell).innerHTML = i;
		
		document.getElementById('cal_cell_' + intCalCell).onclick = function (obj) {
			
			var currentMonthYear = document.getElementById('monthYear').innerHTML;
			
			var currentMonthYearArray = currentMonthYear.split(' ');

			var currentMonthString = currentMonthYearArray[0];
			var currentYear = currentMonthYearArray[1];
			
			for(currentMonth=0; currentMonth<12; currentMonth++)
			{
				if(monthsArray[currentMonth] == currentMonthString)
				{
					break;
				}
			}	
			
			//var dayClick = obj.srcElement.innerHTML;
			
			var dayClick = obj.target.innerHTML;

			var dayPadding = dayClick;
			
			if(dayClick.length != 2)
				dayPadding = '0' + dayPadding;
						
			if(document.getElementById(inputCalendarId) != null)
			{
				document.getElementById(inputCalendarId).value = dayPadding + '-' + currentMonthString.substr(0,3).toLowerCase() + '-' + currentYear;
			}

			document.getElementById(divCalendarId).style.display = "none";
		};
		
		if(i == days)
			calendarDayEnd = intCalCell;
	}
	
	for(i=1; i<=42; i++)
	{
		intCalCell = i + parseInt(calendarDayEnd);
		if(intCalCell <= 42)
			document.getElementById('cal_cell_' + intCalCell).innerHTML = "&nbsp";
		else
			break;
	}
	
	var currentMonthYear = document.getElementById('monthYear').innerHTML;
	
	var currentMonthYearArray = currentMonthYear.split(' ');
			
	var currentMonthString = currentMonthYearArray[0];
	var currentYear = currentMonthYearArray[1];
	
	for(currentMonth=0; currentMonth<12; currentMonth++)
	{
		if(monthsArray[currentMonth] == currentMonthString)
		{
			break;
		}
	}	
	
	var calendarCurrentDate = new Date();
	var calendarCurrentDay = calendarCurrentDate.getDate();
	var calendarCurrentMonth = calendarCurrentDate.getMonth();
	var calendarCurrentYear = calendarCurrentDate.getFullYear();	
	
	var selectedDay = this.getInputCalendarValue("day",inputCalendarId, monthsArray);
	var selectedMonth = this.getInputCalendarValue("month",inputCalendarId, monthsArray);
	var selectedYear = this.getInputCalendarValue("year",inputCalendarId, monthsArray);	
	
	for(i=1; i<=42; i++)
	{
		var calCell = document.getElementById('cal_cell_' + i);
		
		if(calCell.innerHTML != "" && calCell.innerHTML != "&nbps")
		{
			if(parseInt(calCell.innerHTML) == calendarCurrentDay && currentMonth == calendarCurrentMonth && currentYear == calendarCurrentYear.toString())
			{
				calCell.className = "currentDay";
				calCell.style.fontWeight = "bold";
			}
			else
			{
				if(selectedDay != "" && (selectedMonth == 0 || selectedMonth <12) && selectedYear != "")
				{
					if(parseInt(calCell.innerHTML) == selectedDay && currentMonth == selectedMonth && currentYear == selectedYear)
					{
						calCell.className = "selectedDay";
					}
				}			
				else
					calCell.className = "normalDay";
			}
		}
	}
},

/**
 * To find out the days in the month given month and year.
 * @function
 * @name Calendar#daysInMonth
 * 
 * @param {string} month the month to get the number of days 
 * @param {string} year the year to get the number of days
 **/
daysInMonth: function(month, year) {
	
	return new Date(year, month, 0).getDate();
	
},

/**
 * Move calendar backward or forward
 * @function
 * @name Calendar#moveCalendar
 * 
 * @param {string} backOrForward back or forward
 * @param {Object} obj the table cell of the left or right arrow used to set the month and  year header
 * @param {string} inputCalendarId the calendar input box
 * @param {string} divCalendarId the calendar div id
 * @param {Array} monthsArray array holding the string months
 **/
moveCalendar: function(backOrForward, obj, inputCalendarId, divCalendarId, monthsArray) {
	
	var monthYear = obj.parentElement.parentElement.rows[0].cells[1].innerHTML;
	var monthYearArray = monthYear.split(" ");
	
	var month = monthYearArray[0];

	var year = monthYearArray[1];
	
	var numMonths = 12;
	
	var monthIndex;
	
	for(i=0; i<numMonths-1; i++)
	{
		if(monthsArray[i] == month)
		{
			break;
		}
	}
	
	var newYear, newMonth;
	
	if(backOrForward == "back")
	{
		if(i == 0)
		{
			newYear = parseInt(year) - 1;
			newMonth = 11;
		}
		else
		{
			newYear = parseInt(year);
			newMonth = i - 1;
		}
	}
	else
	if(backOrForward == "forward")
	{
		if(i == 11)
		{
			newYear = parseInt(year) + 1;
			newMonth = 0;
		}
		else
		{
			newYear = parseInt(year);
			newMonth = i + 1;
		}		
	}

	obj.parentElement.cells[1].innerHTML = monthsArray[newMonth] + ' ' + newYear;
	
	var calendar = new BillingTracker.Calendar();
	
	calendar.calendar(newMonth, newYear, inputCalendarId, divCalendarId, monthsArray);

},

/**
 * Clear the calendar before creating the calendar moving from one month to another
 * @function
 * @name Calendar#clearCalendar
 **/
clearCalendar: function() {
	
	for(calCellDay=1; calCellDay<=42; calCellDay++)
	{
		var calCell = document.getElementById('cal_cell_' + calCellDay);
		
		calCell.innerHTML = "";
		calCell.onclick = null;
		
		if(calCell.style.fontWeight == "bold")
			calCell.style.fontWeight = "normal";
				
		calCell.className = "normalDay";		
	}
	
}

}