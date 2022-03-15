/**
 * Class for storing grid handlers
 * @class
 **/
 BillingTracker.Handler = function() {
	
};

BillingTracker.Handler.prototype = {

/**
 * Clicking on BillsFormGridPaging header row that goes to the server
 * @function
 * @name Handler#sortTableColumnOnclickHandlerBillsFormGridPaging
 * 
 * @param {Array} gridColumnsInfo array of grid columns and properties
 * @param {string} column the column number that is being sorted
 * @param {string} pageNumber the current page number of the grid
 **/
sortTableColumnOnclickHandlerBillsFormGridPaging: function(gridColumnsInfo, column, pageNumber) {

    var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
			
    var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();
	
	var callback = new BillingTracker.Callback();

	var sortColumn = gridColumnsInfo[column].id;		
	
	var sortDirection = sessionStorage.getItem("arraySortDirection");	
	
	//alert(sortColumn);
	//alert(sessionStorage.getItem("arraySortColumn"));

	if(sortColumn != sessionStorage.getItem("arraySortColumn"))
	{
		sessionStorage.setItem("arraySortDirection", "asc");

		sessionStorage.setItem("sortOnload", "false");
	}
	else
	{
		// sortColumn DueDate and sortDirection desc is the intial sort column and direction onload of grid
		if(sortColumn == "DueDate" && sessionStorage.getItem("sortOnload") == "true")
		{
			sessionStorage.setItem("arraySortDirection", "asc");

			sessionStorage.setItem("sortOnload", "false");
		}
		else
		{
			if(sortDirection == "asc")
			{
				sessionStorage.setItem("arraySortDirection", "desc");	
			}
			else
			{
				if(sortDirection == "desc")
				{
					sessionStorage.setItem("arraySortDirection", "asc");
				}
			}

			//sessionStorage.setItem("sortOnload", "false");
		}
	}
	
	sessionStorage.setItem("arraySortColumn", sortColumn);

	var column = sessionStorage.getItem("arraySortColumn");
	var direction = sessionStorage.getItem("arraySortDirection");

    var billingAccount = document.getElementById("billingAccountId").value;

	var highlightId = sessionStorage.getItem("highlightRowId");

	var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;

	if(searchValue == "" || searchValue == undefined)
	{
		grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryName(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, '', '', callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumber, highlightId, bills_form_grid_paging.getPageSize());
	}
	else
	{
		grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryNameSearch(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, "searchValue", searchValue, callback.gridCallback, bills_form_grid_paging.getRowOnClick(),column, direction, pageNumber, highlightId, bills_form_grid_paging.getPageSize());
	}
	
},

/**
 * BillFormGridPaging row onclick handler
 * @function
 * @name Handler#BillFormGridPagingOnClickHandler
 * 
 * @param {string} phpFile php file name and location
 * @param {string} gridRowId row onclick primary key
 * @param {string} tableHtmlObjectId the table to set the row highlighting after onclick
 **/
 BillFormGridPagingOnClickHandler: function(phpFile, gridRowId, tableHtmlObjectId) {

	var tableBills = document.getElementById(tableHtmlObjectId);
	var row;

	for(var i=0; i<tableBills.rows.length; i++)
	{
		row = tableBills.rows[i];
		if(row.cells[0].innerText == gridRowId)
		{
			row.className = "tableHover highlightRow";
		}
		else
		{
			row.className = "rowClickCursor";
		}
	}

	sessionStorage.setItem("highlightRowId", gridRowId);

	var billsForm= new BillingTracker.BillsForm();
		
	var arrayOldValuesTable = billsForm.arrayOldValuesTable;
	
	var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
	
	var callback = new BillingTracker.Callback();

	grid_get_post_functions.get_populateForm(phpFile, "populateBillsForm", gridRowId, billsForm.getFieldsInfo(), '', arrayOldValuesTable, callback.get_populateForm_callback);
	
}

}