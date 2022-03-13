
// note: cannot put alert or console in the onbeforeunload
document.getElementById("billingTracker").onbeforeunload = function() {
    
    var billingAccountsSelectList = document.getElementById("billingAccountsSelectList").value;
    sessionStorage.setItem("form_billingAccountsSelectList", billingAccountsSelectList);

    var billingAccountId = document.getElementById("billingAccountId").value;
    sessionStorage.setItem("form_billingAccountId", billingAccountId);

    var accountName = document.getElementById("accountName").value;
    sessionStorage.setItem("form_accountName", accountName);

    var accountNumber = document.getElementById("accountNumber").value;
    sessionStorage.setItem("form_accountNumber", accountNumber);

    var accountUserName = document.getElementById("accountUserName").value;
    sessionStorage.setItem("form_accountUserName", accountUserName);      

    
    var billsFormGridPagingSearchValue = document.getElementById("billsFormGridPagingSearchValue").value;
    sessionStorage.setItem("form_billsFormGridPagingSearchValue", billsFormGridPagingSearchValue);  


	var tableGetValues = document.getElementById("tableBillsFormGridPaging");

	if(tableGetValues == null)
		return;

	var row;
	var gridValuesArray;

    //row.cells[0] - billsPrimaryKey
    //row.cells[1] - billingDate
    //row.cells[2] - dueDate
    //row.cells[4] - billingNumber
    //row.cells[3] - amountDue
    //row.cells[5] - paidDate
    //row.cells[6] - paymentMethod
    //row.cells[7] - amountPaid
    
	for(var i=0; i<tableGetValues.rows.length; i++)
	{
		if(i == 0)
			continue;
		
		row = tableGetValues.rows[i];

		if(row.className == "tableHover highlightRow")
		{
			gridValuesArray = row.cells[0].innerHTML + ";" + row.cells[1].innerHTML + ";" + row.cells[2].innerHTML + ";" + row.cells[4].innerHTML + ";" + row.cells[3].innerHTML + ";" + row.cells[5].innerHTML + ";" + row.cells[6].innerHTML + ";" + row.cells[7].innerHTML;
		}
    }

    sessionStorage.setItem("grid_values", gridValuesArray);


    var gridGetPostBillsFormGridPagingPageNumber = document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value;
    sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPageNumber", gridGetPostBillsFormGridPagingPageNumber);
}

document.getElementById("billingTracker").onpagehide = function() {

    var billingAccountsSelectList = document.getElementById("billingAccountsSelectList").value;
    sessionStorage.setItem("form_billingAccountsSelectList", billingAccountsSelectList);

    var billingAccountId = document.getElementById("billingAccountId").value;
    sessionStorage.setItem("form_billingAccountId", billingAccountId);

    var accountName = document.getElementById("accountName").value;
    sessionStorage.setItem("form_accountName", accountName);

    var accountNumber = document.getElementById("accountNumber").value;
    sessionStorage.setItem("form_accountNumber", accountNumber);

    var accountUserName = document.getElementById("accountUserName").value;
    sessionStorage.setItem("form_accountUserName", accountUserName);      

    
    var billsFormGridPagingSearchValue = document.getElementById("billsFormGridPagingSearchValue").value;
    sessionStorage.setItem("form_billsFormGridPagingSearchValue", billsFormGridPagingSearchValue);  


	var tableGetValues = document.getElementById("tableBillsFormGridPaging");

	if(tableGetValues == null)
		return;

	var row;
	var gridValuesArray;

    //row.cells[0] - billsPrimaryKey
    //row.cells[1] - billingDate
    //row.cells[2] - dueDate
    //row.cells[4] - billingNumber
    //row.cells[3] - amountDue
    //row.cells[5] - paidDate
    //row.cells[6] - paymentMethod
    //row.cells[7] - amountPaid
    
	for(var i=0; i<tableGetValues.rows.length; i++)
	{
		if(i == 0)
			continue;
		
		row = tableGetValues.rows[i];

		if(row.className == "tableHover highlightRow")
		{
			gridValuesArray = row.cells[0].innerHTML + ";" + row.cells[1].innerHTML + ";" + row.cells[2].innerHTML + ";" + row.cells[4].innerHTML + ";" + row.cells[3].innerHTML + ";" + row.cells[5].innerHTML + ";" + row.cells[6].innerHTML + ";" + row.cells[7].innerHTML;
		}
    }

    sessionStorage.setItem("grid_values", gridValuesArray);


    var gridGetPostBillsFormGridPagingPageNumber = document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value;
    sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPageNumber", gridGetPostBillsFormGridPagingPageNumber);    

}

