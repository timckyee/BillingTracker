/**
 * Class for creating grid, http method get populate form, post update form, post insert record form
 * @class
 **/
 BillingTracker.Grid_Get_Post_Functions = function() {
	
};

BillingTracker.Grid_Get_Post_Functions.prototype = {

/**
 * Creates an html grid with sorting and paging
 * @function
 * @name Grid_Get_Post_Functions#grid
 * 
 * @param {string} divElement the html div id to use to attach the table to 
 * @param {string} phpFile php file name and location
 * @param {string} queryName the php query name for http method get
 * @param {string} gridIdField the primary key for the table rows
 * @param {Array} gridColumnsInfo grid object array of columns
 * @param {string} tableHtmlObjectId the html table object
 * @param {string} additionalArgs additional arguments to pass into the XMLHttpRequest get
 * @param {string} additionalArgsValue additional arguments value to pass into the XMLHttpRequest get
 * @param {string} additionalArgs2 additional arguments to pass into the XMLHttpRequest get
 * @param {string} additionalArgsValue2 additional arguments value to pass into the XMLHttpRequest get 
 * @param {function} callback the function to call when the XMLHttpRequest get method returns
 * @param {function} rowOnClick the handler to call when the user clicks on row in the table
 * @param {string} showEditColumn to show or hide the edit column in the table
 * @param {string} sortColumn the grid column which is currently sorted 
 * @param {string} sortDirection the direction which is currently sorted
 * @param {string} pageNumber the page number of the table we are currently showing
 * @param {string} highlightRowId the row in the table which is highlighted after editing and saving the row
 * @param {string} pageSize paging size for the grid
 **/
grid: function(divElement, phpFile, queryName, gridIdField, gridColumnsInfo, tableHtmlObjectId, additionalArgs, additionalArgsValue, additionalArgs2, additionalArgsValue2, callback, rowOnClick, sortColumn, sortDirection, pageNumber, highlightRowId, pageSize) {

	var divTable = document.getElementById(divElement);

	window.gridXmlHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);				
				
			callback(phpFile, response, divTable, tableHtmlObjectId, gridIdField, gridColumnsInfo, rowOnClick, sortColumn, sortDirection, pageNumber, highlightRowId);					
		}
	};
	
	var queryString;

	if("tableBillsFormGridPaging")
	{
		if(additionalArgs2 != "")
		{
			queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + additionalArgs2 + "=" + additionalArgsValue2 + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber + "&" + "pageSize=" + pageSize;
		}
		else
		{
			if(additionalArgs != "")
			{
				queryString = "queryName" + "=" + queryName + "&" + additionalArgs + "=" + additionalArgsValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber + "&" + "pageSize=" + pageSize;
			}
			else
			{
				queryString = "queryName" + "=" + queryName + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "pageNumber=" + pageNumber + "&" + "pageSize=" + pageSize;
			}
		}	
	}

	window.gridXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.gridXmlHttpRequest.send();
	
},

 /**
  * Shows the grid after saving record with updated page number and highlight.
  * @function
  * @name Grid_Get_Post_Functions#showTheGridAfterSaveRecord
  * 
  * @param {string} phpFile the php query name for http method get
  * @param {string} queryName the php query name for http method get
  * @param {string} queryType the php query type - either getPageNumber or result set
  * @param {string} savePrimaryKey the primary key field name we are saving
  * @param {string} savePrimaryKeyValue the primary key value we are saving
  * @param {string} sortColumn column of the sort to find the page of the savePrimaryKeyValue
  * @param {string} sortDirection direction of the sort to find the page of the savePrimaryKeyValue
  * @param {string} billingAccountId billing account id
  * @param {string} searchValueField the field name of the search value
  * @param {string} searchValue the value of the search field
  * @param {string} tableHtmlObjectId table name of the form grid
  * @param {string} pageSize paging size for the grid
  **/
showTheGridAfterSaveRecord: function(phpFile, queryName, queryType, savePrimaryKey, savePrimaryKeyValue, sortColumn, sortDirection, billingAccountId, searchValueField, searchValue, tableHtmlObjectId, pageSize) 
{
	window.getPageNumberHttpRequest.onreadystatechange = function() {
				
		if (this.readyState == 4 && this.status == 200) {

			var response = JSON.parse(this.responseText);
			
			if(tableHtmlObjectId == "tableBillsFormGridPaging")
			{
				var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();

				var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();	
				
				var callback = new BillingTracker.Callback();

				var column = sessionStorage.getItem("arraySortColumn");
				var direction = sessionStorage.getItem("arraySortDirection");

				var pageNumber = response;
				
				var pageNumberString = pageNumber.toString();
			
				if(pageNumberString == "0")
				{
					var pageNumberBillsGrid = sessionStorage.getItem("gridBillsFormGridPagingPageNumber");
			
					if(searchValue == "" || searchValue == undefined)
					{
						grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryName(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccountId, '', '', callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumberBillsGrid, '', bills_form_grid_paging.getPageSize());
					}
					else
					{
						grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryNameSearch(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccountId, "searchValue", searchValue, callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumberBillsGrid, '', bills_form_grid_paging.getPageSize());
					}

					document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = pageNumberBillsGrid;

					sessionStorage.setItem("gridBillsFormGridPagingPageNumber", pageNumberBillsGrid);
				}
				else
				{
					if(searchValue == "" || searchValue == undefined)
					{			
						grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryName(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccountId, '', '', callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumberString, savePrimaryKeyValue, bills_form_grid_paging.getPageSize());
					}
					else
					{
						grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryNameSearch(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccountId, "searchValue", searchValue, callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumberString, savePrimaryKeyValue, bills_form_grid_paging.getPageSize());
					}

					document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = pageNumberString;

					sessionStorage.setItem("gridBillsFormGridPagingPageNumber", pageNumberString);				
				}
			}
		}
	};

	var queryString;

	if(searchValue != "")
	{
		queryString = "queryName" + "=" + queryName + "&" + "queryType" + "=" + queryType + "&" + savePrimaryKey + "=" + savePrimaryKeyValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "billingAccountId=" + billingAccountId + "&" + searchValueField + "=" + searchValue + "&" + "pageSize=" + pageSize;
	}
	else
	{
		queryString = "queryName" + "=" + queryName + "&" + "queryType" + "=" + queryType + "&" + savePrimaryKey + "=" + savePrimaryKeyValue + "&" + "sortColumn=" + sortColumn + "&" + "sortDirection=" + sortDirection + "&" + "billingAccountId=" + billingAccountId + "&" + "pageSize=" + pageSize;
	}

	window.getPageNumberHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getPageNumberHttpRequest.send();
},

/**
 * Populate html object form
 * @function
 * @name Grid_Get_Post_Functions#get_populateForm
 * 
 * @param {string} phpFile php file name and location
 * @param {string} queryName the php query name for http method get
 * @param {string} htmlObjectPrimaryKeyValue row onclick primary key
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTable array to keep track of form old values used for updating fields
 * @param {function} callback the function to call when the XMLHttpRequest get method returns
 **/
get_populateForm: function(phpFile, queryName, htmlObjectPrimaryKeyValue, fieldsInfo, autocompleteInputs, arrayOldValuesTable, callback)
{		
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);
			
			callback(response, fieldsInfo, autocompleteInputs, arrayOldValuesTable);
		
		}
	}
	
	var queryString = "queryName" + "=" + queryName + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue;
	
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
},

/**
 * Get the total page numbers
 * @function
 * @name Grid_Get_Post_Functions#get_pageNumbers
 * 
 * @param {string} phpFile php file name and location
 * @param {string} divPagingFooter the html div object containing the footer
 * @param {string} queryName the php query name for http method get 
 * @param {string} pageSize paging size for the grid
 * @param {string} tableHtmlObjectId table name of the form grid
 * @param {string} searchValueField the field name of the search value
 * @param {string} searchValue the value of the search field
 * @param {string} billingAccount the billing account we are viewing
 * @param {string} onload whether this is the first time loading grid to preload second grid
 **/
get_pageNumbers: function(phpFile, divPagingFooter, queryName, pageSize, tableHtmlObjectId, searchValueField, searchValue, billingAccount)
{
	window.getXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			
			var response = JSON.parse(this.responseText);

			if(tableHtmlObjectId == "tableBillsFormGridPaging")
			{
				//if(response == "0")
				//{
				//	document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = "0";
				//}

				document.getElementById("gridGetPostBillsFormGridPagingPages").innerText = "of " + response;
			}

			document.getElementById(divPagingFooter).style.display = "block";
		}
	}
	
	var queryString;

    var billingAccount = document.getElementById("billingAccountId").value;

	if(searchValue != "")
	{
		queryString = "queryName" + "=" + queryName + "&" + "pageSize=" + pageSize + "&" + "billingAccountId=" + billingAccount + "&" + searchValueField + "=" + searchValue;
	}
	else
	{
		queryString = "queryName" + "=" + queryName + "&" + "pageSize=" + pageSize + "& " + "billingAccountId=" + billingAccount;
	}
	
	window.getXmlHttpRequest.open("GET", phpFile + "?" + queryString, true);
	window.getXmlHttpRequest.send();
},

/**
 * Send updated form values to the server
 * @function
 * @name Grid_Get_Post_Functions#post_updateForm

 * @param {string} phpFile php file name and location
 * @param {string} postType php post query name
 * @param {string} htmlObjectPrimaryKeyValue the form primary key value
 * @param {Array} htmlObjectFieldsValuesUpdate the html objects updated values
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} arrayOldValuesTable array of old values before the update. is set to the new values after an update.
 * @param {string} tableHtmlObjectId table name of the form grid
 **/
post_updateForm:function (phpFile, postType, htmlObjectPrimaryKeyValue, htmlObjectFieldsValuesUpdate, fieldsInfo, arrayOldValuesTable, tableHtmlObjectId)
{	
	if(document.getElementById("dueDate").value == "")
	{
		alert("Due Date is required");
		return;
	}

	if(document.getElementById("amountDue").value == "")
	{
		alert("Amount due is required");
		return;
	}

	var updateString = "";

	var billsPrimaryKey = htmlObjectPrimaryKeyValue[0];

	var calendar = new BillingTracker.Calendar();
	var helper = new BillingTracker.Helper();

	var billingDate = htmlObjectFieldsValuesUpdate[1];
	var billingDateFromSystem = billingDate;
	var billingDateFromDatabase = helper.convertDateFromSystem(billingDateFromSystem);

	if(calendar.validateDateFromString(billingDate) == false)
	{
		alert("input format date has to be dd-mmm-yyyy");
		return;
	}	

	if(arrayOldValuesTable["billingDate"] != billingDate)
	{
		if(billingDate == "")
		{
			updateString = updateString + "BillingDate=null,";
		}
		else
		{
			updateString = updateString + "BillingDate='" + billingDateFromDatabase + "',";
		}
	}	

	var dueDate = htmlObjectFieldsValuesUpdate[2];
	var dueDateFromSystem = dueDate;
	var dueDateFromDatabase = helper.convertDateFromSystem(dueDateFromSystem);

	if(calendar.validateDateFromString(dueDate) == false)
	{
		alert("input format date has to be dd-mmm-yyyy");
		return;
	}
	
	if(arrayOldValuesTable["dueDate"] != dueDate)
	{
		updateString = updateString + "DueDate='" + dueDateFromDatabase + "',";
	}

	var billingNumber = htmlObjectFieldsValuesUpdate[3];
	if(arrayOldValuesTable["billingNumber"] != billingNumber)
	{
		if(billingNumber == "")
		{
			updateString = updateString + "BillingNumber=null,";
		}
		else
		{
			updateString = updateString + "BillingNumber='" + billingNumber + "',";
		}
	}

	var amountDue = htmlObjectFieldsValuesUpdate[4];
	if(arrayOldValuesTable["amountDue"] != amountDue)
	{
		updateString = updateString + "AmountDue='" + amountDue + "',";
	}

	var paidDate = htmlObjectFieldsValuesUpdate[5];
	var paidDateFromSystem = paidDate;
	var paidDateFromDatabase = helper.convertDateFromSystem(paidDateFromSystem);

	if(calendar.validateDateFromString(paidDate) == false)
	{
		alert("input format date has to be dd-mmm-yyyy");
		return;
	}

	if(arrayOldValuesTable["paidDate"] != paidDate)
	{
		if(paidDate == "")
		{
			updateString = updateString + "PaidDate=null,";
		}
		else
		{
			updateString = updateString + "PaidDate='" + paidDateFromDatabase + "',";
		}
	}

	var paymentMethod = htmlObjectFieldsValuesUpdate[6];
	if(arrayOldValuesTable["paymentMethod"] != paymentMethod)
	{
		if(paymentMethod == "")
		{
			updateString = updateString + "PaymentMethod=null,";
		}
		else
		{
			updateString = updateString + "PaymentMethod=" + paymentMethod + ",";
		}
	}

	var amountPaid = htmlObjectFieldsValuesUpdate[7];
	if(arrayOldValuesTable["amountPaid"] != amountPaid)
	{
		if(amountPaid == "")
		{
			updateString = updateString + "AmountPaid=null,";
		}
		else
		{
			updateString = updateString + "AmountPaid='" + amountPaid + "',";
		}
	}

	//alert(updateString);

	if(updateString == "")
	{
		alert("There are no changes to this record");

		return;
	}
	
	if(updateString != "")
	{
		if (confirm("There are changes to the fields. Continue with the update?") == false) {
			return;
		}

		updateString = updateString.substr(0, updateString.length - 1);

		window.postXmlHttpRequest.onreadystatechange = function() {
			
			if (this.readyState == 4 && this.status == 200) {

				for(update=0; update<fieldsInfo.length; update++)
				{			
					arrayOldValuesTable[fieldsInfo[update].htmlObjectId] = htmlObjectFieldsValuesUpdate[update];
				}
				
				var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();
				
				if(tableHtmlObjectId == bills_form_grid_paging.getTableHtmlObjectId())
				{
					var grid_get_post_function = new BillingTracker.Grid_Get_Post_Functions();

					var billingAccountId = document.getElementById("billingAccountId").value;

					var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;

					if(searchValue == "" || searchValue == undefined)
					{
						grid_get_post_function.showTheGridAfterSaveRecord(bills_form_grid_paging.getPhpFile(), "griduserbills", "getPageNumber", "savePrimaryKey", htmlObjectPrimaryKeyValue, sessionStorage.getItem("arraySortColumn"), sessionStorage.getItem("arraySortDirection"), billingAccountId, '', '', tableHtmlObjectId, bills_form_grid_paging.getPageSize());
					}
					else
					{
						grid_get_post_function.showTheGridAfterSaveRecord(bills_form_grid_paging.getPhpFile(), "griduserbillsSearch", "getPageNumber", "savePrimaryKey", htmlObjectPrimaryKeyValue, sessionStorage.getItem("arraySortColumn"), sessionStorage.getItem("arraySortDirection"), billingAccountId, "searchValue", searchValue, tableHtmlObjectId, bills_form_grid_paging.getPageSize());
					}
				}
				
			}
		}

		var formVariables = "postType" + "=" + postType + "&" + "htmlObjectPrimaryKeyValue" + "=" + htmlObjectPrimaryKeyValue + "&" + "updateString" + "=" + encodeURIComponent(updateString);
			
		window.postXmlHttpRequest.open("POST", phpFile, true);
		window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		window.postXmlHttpRequest.send(formVariables);
	}
},

/**
 * Send form values of new record to the server
 * @function
 * @name Grid_Get_Post_Functions#post_insertRecordForm
 * 
 * @param {string} phpFile php file name and location
 * @param {string} postType php post query name
 * @param {Array} htmlObjectFieldsValuesInsert the html objects new values
 * @param {Array} fieldsInfo form object array of fields
 * @param {string} inputPrimaryKeyId the input object id to set the new insert id
 * @param {Array} arrayOldValuesTable array of old values before the insert. is set to the new values after an insert.
 * @param {string} tableHtmlObjectId table name of the form grid
 **/
post_insertRecordForm: function(phpFile, postType, htmlObjectFieldsValuesInsert, fieldsInfo, inputPrimaryKeyId, arrayOldValuesTable, tableHtmlObjectId)
{	
	if (confirm("Confirm to create new record?") == false) {
		return;
	}

	if(document.getElementById("dueDate").value == "")
	{
		alert("Due Date is required");
		return;
	}

	if(document.getElementById("amountDue").value == "")
	{
		alert("Amount due is required");
		return;
	}

	var insertString = "";
 	
	var billingAccountId = document.getElementById("billingAccountId").value;

	insertString = insertString + "(BillingAccountId, BillingDate, DueDate, BillingNumber, AmountDue, PaidDate, PaymentMethod, AmountPaid)";
	
	insertString = insertString + " values (";

	insertString = insertString + billingAccountId + ",";

	var helper = new BillingTracker.Helper();
	var calendar = new BillingTracker.Calendar();

	var billingDate = htmlObjectFieldsValuesInsert[1];
	var dueDate = htmlObjectFieldsValuesInsert[2];
	var billingNumber = htmlObjectFieldsValuesInsert[3];
	var amountDue = htmlObjectFieldsValuesInsert[4];
	var paidDate = htmlObjectFieldsValuesInsert[5];
	var paymentMethod = htmlObjectFieldsValuesInsert[6];
	var amountPaid = htmlObjectFieldsValuesInsert[7];

	// billingDate
	var billingDateFromSystem = billingDate;
	
	var billingDateFromDatabase = helper.convertDateFromSystem(billingDateFromSystem);
	
	if(calendar.validateDateFromString(billingDateFromSystem) == false)
	{
		alert("input date format has to be dd-mmm-yyyy");
		return;
	}	

	if(billingDateFromSystem == "")
	{
		insertString = insertString + "null,";
	}
	else
	{
		insertString = insertString + "'" + billingDateFromDatabase + "',";
	}

	// dueDate
	var dueDateFromSystem = dueDate;

	var dueDateFromDatabase = helper.convertDateFromSystem(dueDateFromSystem);
	
	if(calendar.validateDateFromString(dueDateFromSystem) == false)
	{
		alert("input date format has to be dd-mmm-yyyy");
		return;
	}	

	insertString = insertString + "'" + dueDateFromDatabase + "',";

	// billing number
	if(billingNumber == "")
	{
		insertString = insertString + "null,";
	}
	else
	{
		insertString = insertString + "'" + billingNumber + "',";
	}

	// amount due
	insertString = insertString + "'" + amountDue + "',";

	// paid date
	var paidDateFromSystem = paidDate;

	var paidDateFromDatabase = helper.convertDateFromSystem(paidDateFromSystem);
	
	if(calendar.validateDateFromString(paidDateFromSystem) == false)
	{
		alert("input date format has to be dd-mmm-yyyy");
		return;
	}	

	if(paidDateFromSystem == "")
	{
		insertString = insertString + "null,";
	}
	else
	{
		insertString = insertString + "'" + paidDateFromDatabase + "',";
	}

	// payment method
	if(paymentMethod == "")
	{		
		insertString = insertString + "null,";
	}
	else
	{
		insertString = insertString + paymentMethod + ",";
	}

	// amount paid
	if(amountPaid == "")
	{
		insertString = insertString +"null,";
	}
	else
	{
		insertString = insertString + "'" + amountPaid + "',";
	}

	insertString = insertString.substr(0, insertString.length - 1);
			
	insertString = insertString + ")";
	
	window.postXmlHttpRequest.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {	
		
			var insertId = this.responseText;
			
			document.getElementById(inputPrimaryKeyId).value = insertId;
			
			arrayOldValuesTable[inputPrimaryKeyId] = insertId;

			for(insert=0; insert<fieldsInfo.length; insert++)
			{				
				arrayOldValuesTable[fieldsInfo[insert].htmlObjectId] = htmlObjectFieldsValuesInsert[insert];
			}		
			
			var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();

			if(tableHtmlObjectId == bills_form_grid_paging.getTableHtmlObjectId())
			{
				var grid_get_post_function = new BillingTracker.Grid_Get_Post_Functions();

				var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;

				if(searchValue == "" || searchValue == undefined)
				{
					grid_get_post_function.showTheGridAfterSaveRecord(bills_form_grid_paging.getPhpFile(), "griduserbills", "getPageNumber", "savePrimaryKey", insertId, sessionStorage.getItem("arraySortColumn"), sessionStorage.getItem("arraySortDirection"),billingAccountId, '', '', tableHtmlObjectId, bills_form_grid_paging.getPageSize());
				}
				else
				{
					grid_get_post_function.showTheGridAfterSaveRecord(bills_form_grid_paging.getPhpFile(), "griduserbillsSearch", "getPageNumber", "savePrimaryKey", insertId, sessionStorage.getItem("arraySortColumn"), sessionStorage.getItem("arraySortDirection"), billingAccountId, "searchValue", searchValue, tableHtmlObjectId, bills_form_grid_paging.getPageSize());
				}
			}
		}
	}	

	var formVariables = "postType" + "=" + postType + "&" + "insertString" + "=" + encodeURIComponent(insertString);
		
	window.postXmlHttpRequest.open("POST", phpFile, true);
	window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	window.postXmlHttpRequest.send(formVariables);

	}
}