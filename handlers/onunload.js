
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

    var billsPrimaryKey = document.getElementById("billsPrimaryKey").value;
    sessionStorage.setItem("form_billsPrimaryKey", billsPrimaryKey);

    var billingDate = document.getElementById("billingDate").value;
    sessionStorage.setItem("form_billingDate", billingDate);

    var dueDate = document.getElementById("dueDate").value;
    sessionStorage.setItem("form_dueDate", dueDate);

    var amountDue = document.getElementById("amountDue").value;
    sessionStorage.setItem("form_amountDue", amountDue);

    var billingNumber = document.getElementById("billingNumber").value;
    sessionStorage.setItem("form_billingNumber", billingNumber);

    var paidDate = document.getElementById("paidDate").value;
    sessionStorage.setItem("form_paidDate", paidDate);

    var paymentMethod = document.getElementById("paymentMethod").value;
    sessionStorage.setItem("form_paymentMethod", paymentMethod);

    var amountPaid = document.getElementById("amountPaid").value;
    sessionStorage.setItem("form_amountPaid", amountPaid);


    var tableGetValues = document.getElementById("tableBillsFormGridPaging");

    var billsPrimaryKey = sessionStorage.getItem("billsPrimaryKey");

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

        if(row.cells[0].innerHTML == billsPrimaryKey)
        {
            gridValuesArray = row.cells[0].innerHTML + ";" + row.cells[1].innerHTML + ";" + row.cells[2].innerHTML + ";" + row.cells[4].innerHTML + ";" + row.cells[3].innerHTML + ";" + row.cells[5].innerHTML + ";" + row.cells[6].innerHTML + ";" + row.cells[7].innerHTML;
        }
    }
    
    sessionStorage.setItem("gridValuesArray", gridValuesArray);


    // if entering search term, clicking on search, and no records
    // or entering search term as empty and refreshing the page
    // pageNumber will be 0
    var gridGetPostBillsFormGridPagingPageNumber = document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value;
    sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPageNumber", gridGetPostBillsFormGridPagingPageNumber);

    // this is the page number in the session storage
    //var gridGetPostBillsFormGridPagingPageNumberSession = sessionStorage.getItem("gridBillsFormGridPagingPageNumber");
    //sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPageNumberSession", gridGetPostBillsFormGridPagingPageNumberSession);

    //var gridGetPostBillsFormGridPagingPages = document.getElementById("gridGetPostBillsFormGridPagingPages").innerHTML;
    //sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPages", gridGetPostBillsFormGridPagingPages);
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

    var billsPrimaryKey = document.getElementById("billsPrimaryKey").value;
    sessionStorage.setItem("form_billsPrimaryKey", billsPrimaryKey);

    var billingDate = document.getElementById("billingDate").value;
    sessionStorage.setItem("form_billingDate", billingDate);

    var dueDate = document.getElementById("dueDate").value;
    sessionStorage.setItem("form_dueDate", dueDate);

    var amountDue = document.getElementById("amountDue").value;
    sessionStorage.setItem("form_amountDue", amountDue);

    var billingNumber = document.getElementById("billingNumber").value;
    sessionStorage.setItem("form_billingNumber", billingNumber);

    var paidDate = document.getElementById("paidDate").value;
    sessionStorage.setItem("form_paidDate", paidDate);

    var paymentMethod = document.getElementById("paymentMethod").value;
    sessionStorage.setItem("form_paymentMethod", paymentMethod);

    var amountPaid = document.getElementById("amountPaid").value;
    sessionStorage.setItem("form_amountPaid", amountPaid);


    var tableGetValues = document.getElementById("tableBillsFormGridPaging");

    var billsPrimaryKey = sessionStorage.getItem("billsPrimaryKey");

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

        if(row.cells[0].innerHTML == billsPrimaryKey)
        {
            gridValuesArray = row.cells[0].innerHTML + ";" + row.cells[1].innerHTML + ";" + row.cells[2].innerHTML + ";" + row.cells[4].innerHTML + ";" + row.cells[3].innerHTML + ";" + row.cells[5].innerHTML + ";" + row.cells[6].innerHTML + ";" + row.cells[7].innerHTML;
        }
    }
    
    sessionStorage.setItem("gridValuesArray", gridValuesArray);
        

    // if entering search term, clicking on search, and no records
    // or entering search term as empty and refreshing the page
    // pageNumber will be 0
    var gridGetPostBillsFormGridPagingPageNumber = document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value;
    sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPageNumber", gridGetPostBillsFormGridPagingPageNumber);

    // this is the page number in the session storage
    //var gridGetPostBillsFormGridPagingPageNumberSession = sessionStorage.getItem("gridBillsFormGridPagingPageNumber");
    //sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPageNumberSession", gridGetPostBillsFormGridPagingPageNumberSession);

    //var gridGetPostBillsFormGridPagingPages = document.getElementById("gridGetPostBillsFormGridPagingPages").innerHTML;
    //sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPages", gridGetPostBillsFormGridPagingPages);
}

