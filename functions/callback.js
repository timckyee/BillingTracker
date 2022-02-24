/**
 * Class for storing callback functions
 * @class
 **/
 BillingTracker.Callback = function() {
	
};

BillingTracker.Callback.prototype = {

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions grid
 * @function
 * @name Callback#gridCallback
 * 
 * @param {string} phpFile php file name and location
 * @param {string} response the response from the XMLHttpRequest get
 * @param {string} divTable the html div object to attach the table to 
 * @param {string} tableHtmlObjectId the html table id
 * @param {string} gridIdField the primary key for the table rows
 * @param {Array} gridColumnsInfo grid object array of columns 
 * @param {function} rowOnClick the handler to call when the user clicks on row in the table
 * @param {string} showEditColumn to show or hide the edit column in the table
 * @param {string} sortColumn the grid column which is currently sorted
 * @param {string} sortDirection the direction which is currently sorted
 * @param {string} pageNumber the page number of the table we are currently showing
 * @param {string} highlightRowId the row in the table which is highlighted after editing and saving the row
 * @param {string} showEditRow show the edit row html objects - not using this field
 * @param {string} savePrimaryKeyValue the primary key value of the edit row were are saving
 * @param {string} highlightRow flag to highlight the row after save
 * @param {string} showPagingFooter if there is a grid footer for paging
 * @param {string} divPagingFooter the paging footer div
 * @param {string} onload whether this is the first time loading grid to load second grid
 **/
gridCallback: function(phpFile, response, divTable, tableHtmlObjectId, gridIdField, gridColumnsInfo, rowOnClick, showEditColumn, sortColumn, sortDirection, pageNumber, highlightRowId, showEditRow, savePrimaryKeyValue, highlightRow, showPagingFooter, divPagingFooter, onload) {

	var tbl = document.createElement("table");
	tbl.id = tableHtmlObjectId;
	

	var helper = new BillingTracker.Helper();

	var platform = helper.checkPlatform();

	if(platform == "desktop_chrome")
	{
		if(tableHtmlObjectId == "tableBillsFormGridPaging")
		{
			tbl.className = "billsGrid_chrome";
		}
	}
	else
	if(platform == "IOS")
	{
		if(tableHtmlObjectId == "tableBillsFormGridPaging")
		{
			tbl.className = "billsGridIOS";
		}
	}	
	else
	if(platform == "android")
	{
		if(tableHtmlObjectId == "tableBillsFormGridPaging")
		{
			tbl.className = "billsGridMobile";
		}
	}

	
	var tableHeaderRow = document.createElement("tr");

	var tableHeader;
	/*
	if(showEditColumn == "showEdit")
	{
		tableHeader = document.createElement("th");
		
		tableHeader.style.width = "70px";
		//tableHeader.style.height = "25px";

		tableHeaderRow.appendChild(tableHeader);
	}
	*/

	for(var i=0; i<gridColumnsInfo.length; i++)
	{	
		tableHeader = document.createElement("th");

		//if(gridColumnsInfo[i].hidden == "true")
		//{
		//	tableHeader.style.display = "none";
		//}

		tableHeader.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeader";
		
		var tableHeaderStyle = tableHeader.style;

		//tableHeaderStyle.height = "25px";
		tableHeaderStyle.paddingBottom = "10px";
		tableHeaderStyle.textAlign = "left";
		tableHeaderStyle.whiteSpace = "nowrap";
		tableHeaderStyle.overflow = "hidden";
		tableHeaderStyle.className = "grid";
		tableHeaderStyle.textOverflow = "ellipsis";

        var columnName = gridColumnsInfo[i].colName;

        tableHeaderSpan = document.createElement("span");
        tableHeaderSpan.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "Span";
		tableHeaderSpan.innerHTML = columnName;

		var tableHeaderSpanStyle = tableHeaderSpan.style;

        tableHeaderSpanStyle.textDecoration = "underline";
        tableHeaderSpanStyle.userSelect = "none";
		tableHeaderSpanStyle.cursor = "pointer";
		tableHeaderSpanStyle.paddingLeft = "20px";
		//tableHeaderSpanStyle.paddingRight = "10px";

		if(tableHtmlObjectId == "tableBillsFormGridPaging")
		{
			tableHeaderSpan.onclick = function(headerCellSpan) {

				var columnId = headerCellSpan.srcElement.id;
				for(var column=0; column<gridColumnsInfo.length; column++)
				{
					if(tableHtmlObjectId + "_" + gridColumnsInfo[column].id + "Span" == columnId)
						break;
				}
				
				var handler = new BillingTracker.Handler();

                handler.sortTableColumnOnclickHandlerBillsFormGridPaging(gridColumnsInfo, column.toString(), pageNumber);
			}
		}
		
		tableHeader.appendChild(tableHeaderSpan);

		tableHeaderSpaceFiller = document.createElement("span");
		tableHeaderSpaceFiller.innerHTML = "&nbsp;&nbsp";

		tableHeader.appendChild(tableHeaderSpaceFiller);

		tableHeaderIcon = document.createElement("img");
		tableHeaderIcon.id = tableHtmlObjectId + "_" + gridColumnsInfo[i].id + "ColumnHeaderIcon";
		
		var server = new BillingTracker.Config();

		if(gridColumnsInfo[i].id == sortColumn)
		{
			tableHeaderIcon.width = "14";
			tableHeaderIcon.height = "14";

			if(sortDirection == "asc")
			{
				tableHeaderIcon.src = server.getServerUrl() + "/images/pngfuel.com.up.gif";
			}
			else if(sortDirection == "desc")
			{
				tableHeaderIcon.src = server.getServerUrl() + "/images/pngfuel.com.down.gif";
			}

			tableHeaderIcon.style.display = "inline";
		}
		else
		{
			tableHeaderIcon.style.display = "none";
		}

        tableHeader.appendChild(tableHeaderIcon);

        tableHeaderRow.appendChild(tableHeader);
    
	}
	
	tbl.appendChild(tableHeaderRow);

	for(tableRowCount=0; tableRowCount<response.length; tableRowCount++)
	{
		var row = document.createElement("tr");
		
		if(tableHtmlObjectId == "tableBillsFormGridPaging")
		{
			row.className = "tableHover";
		}
	
		if(highlightRowId != '' && highlightRowId != undefined)
		{
			if(tableHtmlObjectId == "tableBillsFormGridPaging")
			{
				if(response[tableRowCount]["BillsId"] == highlightRowId)
				{
					row.className = "tableHover highlightRow";
				}
			}
		}

		row.onclick = function(rowValues) {

			if(tableHtmlObjectId == "tableBillsFormGridPaging")
			{
				var rowPrimaryKey;

				if(rowValues.target.parentNode.cells == undefined)
				{
					rowPrimaryKey = rowValues.target.cells[0].innerText;
				}
				else
				{
					rowPrimaryKey = rowValues.target.parentNode.cells[0].innerText;
				}

				rowOnClick(phpFile, rowPrimaryKey, tableHtmlObjectId);
			}
		};
			
		var cell;
		var cellText;		
		
		//row.className = "heightRow";
		
		for(var i=0; i<gridColumnsInfo.length; i++)
		{	
			cell = document.createElement("td");

			/*
			if(gridColumnsInfo[i].hidden == "true")
			{
				cellText = document.createTextNode(response[tableRowCount][gridColumnsInfo[i].id]);
				cell.style.display = "none";
			}
			else
			{
			*/
				cell.className = "grid";

				cell.style.padding = "10px";

				var colType = gridColumnsInfo[i].colType;
				
				if(colType == "date")
				{	
					if(gridColumnsInfo[i].id == "BillingDate" || gridColumnsInfo[i].id == "PaidDate")
					{
						if(response[tableRowCount][gridColumnsInfo[i].id] == null)
							cellText = document.createTextNode('');
						else
						{
							var dateFromDatabase = response[tableRowCount][gridColumnsInfo[i].id];
						
							var helper = new BillingTracker.Helper();
							
							var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
							
							cellText = document.createTextNode(dateFormat);
						}
					}
					else
					{
						var dateFromDatabase = response[tableRowCount][gridColumnsInfo[i].id];
						
						var helper = new BillingTracker.Helper();
						
						var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
						
						cellText = document.createTextNode(dateFormat);
					}
				}
				else
				{
					if(gridColumnsInfo[i].id == "BillingNumber" || gridColumnsInfo[i].id == "AmountPaid" || gridColumnsInfo[i].id == "PaymentMethod")
					{
						if(response[tableRowCount][gridColumnsInfo[i].id] == null)
							cellText = document.createTextNode('');
						else
						{
							cellText = document.createTextNode(response[tableRowCount][gridColumnsInfo[i].id]);
						}
					}					
					else				
					{
						cellText = document.createTextNode(response[tableRowCount][gridColumnsInfo[i].id]);
					}
				}
			//}
			
			cell.appendChild(cellText);
			
			row.appendChild(cell);
			
			row.setAttribute("gridIdField", response[tableRowCount][gridIdField]);
		}
		
		tbl.appendChild(row);
	}

	divTable.innerHTML = "";

	divTable.appendChild(tbl);
	
	if(tableHtmlObjectId == "tableBillsFormGridPaging" && document.getElementById("billsFormGridPagingSearchInputAndButton").style.display != "block")
	{
		document.getElementById("billsFormGridPagingSearchInputAndButton").style.display = "block";
	}

	if(tableHtmlObjectId == "tableBillsFormGridPaging" && document.getElementById("saveNewButtonBillsFormGridPaging").style.display != "block")
	{
		document.getElementById("saveNewButtonBillsFormGridPaging").style.display = "block";
	}
    
	// if showPagingFooter == "true" and sessionStorage.getItem("editMode") != "true"
	// then update the total pageNumbers
	// the get_pageNumbers onload parameter will help preload the second grid, HomeTenantFormGridPaging
	/*
	if(showPagingFooter == "true" && sessionStorage.getItem("editMode") != "true")
	{	
		var grid_get_post_functions = new CodeReuse.Grid_Get_Post_Functions();
		
		if(tableHtmlObjectId == "tableBillsFormGridPaging")
		{
			var home_tenant_form_grid_paging = new CodeReuse.HomeTenantFormGridPaging();

			var searchValue = home_tenant_form_grid_paging.getSearchValue();

			if(searchValue == "" || searchValue == undefined)
			{
				grid_get_post_functions.get_pageNumbers(home_tenant_form_grid_paging.getPhpFile(), divPagingFooter, home_tenant_form_grid_paging.getPageNumbersQueryName(), home_tenant_form_grid_paging.getPageSize(), home_tenant_form_grid_paging.getTableHtmlObjectId(), '', '', onload);
			}
			else
			{
				grid_get_post_functions.get_pageNumbers(home_tenant_form_grid_paging.getPhpFile(), divPagingFooter, home_tenant_form_grid_paging.getPageNumbersQueryName(), home_tenant_form_grid_paging.getPageSize(), home_tenant_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, onload);
			}
		}
	}
	*/

	if(tableHtmlObjectId == "tableBillsFormGridPaging")
	{
		var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
			
		var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();

		var billingAccount = document.getElementById("billingAccountsSelectList").value;

		var searchValue = bills_form_grid_paging.getSearchValue();

		if(searchValue == "" || searchValue == undefined)
		{
			grid_get_post_functions.get_pageNumbers(bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getBillsGridPagingDiv(), bills_form_grid_paging.getPageNumbersQueryName(), bills_form_grid_paging.getPageSize(), bills_form_grid_paging.getTableHtmlObjectId(), '', '', billingAccount, '');
		}
		else
		{
			grid_get_post_functions.get_pageNumbers(bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getBillsGridPagingDiv(), bills_form_grid_paging.getPageNumbersQueryName(), bills_form_grid_paging.getPageSize(), bills_form_grid_paging.getTableHtmlObjectId(), "searchValue", searchValue, billingAccount, '');
		}
	}	

},

/**
 * Callback when the XMLHttpRequest get method returns from function Grid_Get_Post_Functions get_populateForm
 * @function
 * @name Callback#get_populateForm_callback
 * 
 * @param {string} response the response from the XMLHttpRequest get
 * @param {Array} fieldsInfo form object array of fields
 * @param {Array} autocompleteInputs array of autocomplete inputs
 * @param {Array} arrayOldValuesTable array to keep track of form old values used for updating fields
 **/
get_populateForm_callback: function(response, fieldsInfo, autocompleteInputs, arrayOldValuesTable)
{   
	var record = response[0];

	for(i=0; i<fieldsInfo.length; i++)
	{
		document.getElementById(fieldsInfo[i].htmlObjectId).value = "";

		if(fieldsInfo[i].dbType == "date")
		{	
			if(record[fieldsInfo[i].name] != null)
			{
				var dateFromDatabase = record[fieldsInfo[i].name];
				
				var helper = new BillingTracker.Helper();			
							
				var dateFormat = helper.convertDateFromDatabase(dateFromDatabase);
				
				document.getElementById(fieldsInfo[i].htmlObjectId).value = dateFormat;

				arrayOldValuesTable[fieldsInfo[i].htmlObjectId] = dateFormat;
			}
			else
			{
				document.getElementById(fieldsInfo[i].htmlObjectId).value = "";

				arrayOldValuesTable[fieldsInfo[i].htmlObjectId] = "";
			}
		}
		else
		{
			if(record[fieldsInfo[i].name] != null)
			{
				document.getElementById(fieldsInfo[i].htmlObjectId).value = record[fieldsInfo[i].name];
				
				arrayOldValuesTable[fieldsInfo[i].htmlObjectId] = record[fieldsInfo[i].name];
			}
			else
			{
				document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
				
				arrayOldValuesTable[fieldsInfo[i].htmlObjectId] = "";
			}
		}
	}

}

}