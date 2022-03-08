
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

    var billingNumber = document.getElementById("billingNumber").value;
    sessionStorage.setItem("form_billingNumber", billingNumber);

    var amountDue = document.getElementById("amountDue").value;
    sessionStorage.setItem("form_amountDue", amountDue);

    var paidDate = document.getElementById("paidDate").value;
    sessionStorage.setItem("form_paidDate", paidDate);

    var paymentMethod = document.getElementById("paymentMethod").value;
    sessionStorage.setItem("form_paymentMethod", paymentMethod);

    var amountPaid = document.getElementById("amountPaid").value;
    sessionStorage.setItem("form_amountPaid", amountPaid);


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


    var billsPrimaryKey = document.getElementById("billsPrimaryKey").value;
    sessionStorage.setItem("form_billsPrimaryKey", billsPrimaryKey);

    var billingDate = document.getElementById("billingDate").value;
    sessionStorage.setItem("form_billingDate", billingDate);

    var dueDate = document.getElementById("dueDate").value;
    sessionStorage.setItem("form_dueDate", dueDate);

    var billingNumber = document.getElementById("billingNumber").value;
    sessionStorage.setItem("form_billingNumber", billingNumber);

    var amountDue = document.getElementById("amountDue").value;
    sessionStorage.setItem("form_amountDue", amountDue);

    var paidDate = document.getElementById("paidDate").value;
    sessionStorage.setItem("form_paidDate", paidDate);

    var paymentMethod = document.getElementById("paymentMethod").value;
    sessionStorage.setItem("form_paymentMethod", paymentMethod);

    var amountPaid = document.getElementById("amountPaid").value;
    sessionStorage.setItem("form_amountPaid", amountPaid);


    var gridGetPostBillsFormGridPagingPageNumber = document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value;
    sessionStorage.setItem("form_gridGetPostBillsFormGridPagingPageNumber", gridGetPostBillsFormGridPagingPageNumber);    

}

