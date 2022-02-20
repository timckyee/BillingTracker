/*
 * The BillingTracker object
 */
//var BillingTracker = BillingTracker || {};


var images = [];

window.gridXmlHttpRequest = new XMLHttpRequest();
window.getXmlHttpRequest = new XMLHttpRequest();
window.postXmlHttpRequest = new XMLHttpRequest();
window.getPageNumberHttpRequest = new XMLHttpRequest();


document.getElementById("billingTracker").onload = function() {

    var onload = new BillingTracker.Onload();
    onload.loadBillingAccounts();

    //onload.loadPaymentMethods();

    onload.init_calendar_inputs();

    sessionStorage.setItem("gridBillsFormGridPagingPageNumber", "1");

    document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = "1";


    sessionStorage.setItem("arraySortColumn", "DueDate");
    
    sessionStorage.setItem("arraySortDirection", "desc");
        
    
    var server = new BillingTracker.Config();
            
    var helper = new BillingTracker.Helper();

    helper.preload(
        [server.getServerUrl() + "/images/pngfuel.com.up.gif", 
        server.getServerUrl() + "/images/pngfuel.com.down.gif"]
    );

	var platform = helper.checkPlatform();

	if(platform == "IOS")
	{
		document.body.className = "bodyIOS";
	}
	else
	{
		document.body.className = "bodyDesktop";
	}    

    /*
    var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
			
    var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();

    var callback = new BillingTracker.Callback();

    var sortColumn = sessionStorage.getItem("arraySortColumn");

    var sortDirection = sessionStorage.getItem("arraySortDirection");

    var pageNumber = sessionStorage.getItem("gridBillsFormGridPagingPageNumber");

    grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryName(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), '', '', callback.gridCallback, bills_form_grid_paging.getRowOnClick(), '', sortColumn, sortDirection, pageNumber, '', "false", '' ,'', "true", bills_form_grid_paging.getBillsGridPagingDiv(), bills_form_grid_paging.getPageSize(), '');
    */

}

/**
 * Class for onload functions
 * @class
 **/
 BillingTracker.Onload = function() {
	
};

BillingTracker.Onload.prototype = {

	/**
	 * Load the Billing Accounts in the select box
	 * @function
	 * @name Onload#loadBillingAccounts
	 **/
     loadBillingAccounts: function() 
     {
        window.getXmlHttpRequest.onreadystatechange = function() {
         
             if (this.readyState == 4 && this.status == 200) {

                 var response = JSON.parse(this.responseText);

                 var select = "";
     
                 select += "<select id=\"billingAccountsSelectList\">";
     
                 select += "<option value=\"\"></option>";
     
                 for (item in response) {
                     select += "<option value=\"" + response[item].BillingAccountId + "\">" + response[item].AccountName + "</option>";
                 }
                 select += "</select>"
 
                 document.getElementById("billingAccountsSelectList").innerHTML = select;
                 
                 var onload = new BillingTracker.Onload();
                 onload.loadPaymentMethods();                 
             }
         }
 
         var queryString;
     
         queryString = "queryName" + "=" + "billingAccounts";
         
         window.getXmlHttpRequest.open("GET", "php/grid_get_post.php" + "?" + queryString, true);
         window.getXmlHttpRequest.send();
     },

	/**
	 * Load the Payment Methods in the select box
	 * @function
	 * @name Onload#loadPaymentMethods
	 **/
     loadPaymentMethods: function() 
     {
        window.getXmlHttpRequest.onreadystatechange = function() {
         
             if (this.readyState == 4 && this.status == 200) {
 
                 var response = JSON.parse(this.responseText);
     
                 var select = "";
     
                 select += "<select id=\"paymentMethod\">";
     
                 select += "<option value=\"\"></option>";
     
                 for (item in response) {
                     select += "<option value=\"" + response[item].PaymentMethodId + "\">" + response[item].PaymentMethod + "</option>";
                 }
                 select += "</select>"
 
                 document.getElementById("paymentMethod").innerHTML = select;
                 
             }
         }
 
         var queryString;
     
         queryString = "queryName" + "=" + "paymentMethods";
         
         window.getXmlHttpRequest.open("GET", "php/grid_get_post.php" + "?" + queryString, true);
         window.getXmlHttpRequest.send();
     },     

    /**
     * init calendar inputs
     * @function
     * @name Onload#init_calendar_inputs
     **/
    init_calendar_inputs: function() {
        
        var calendar = new BillingTracker.Calendar();
        
        var monthsArray = calendar.populateMonthsArray();

        var divCalendarId = "calendarId";
        
        /*
        document.onclick = function(e) {
            
            calendar.documentOnclick(e, divCalendarId);
            
        }
        */

        var inputCalendarDueDateFormGridPaging = document.getElementById('dueDate');

        var inputCalendarTestingFormGridPaging = document.getElementById('paidDate');


        var inputCalendarDueDateFormGridPagingIcon = document.getElementById('inputCalendarDueDateFormGridPagingIcon');

        var inputCalendarPaidDateFormGridPagingIcon = document.getElementById('inputCalendarPaidDateFormGridPagingIcon');


        inputCalendarDueDateFormGridPaging.addEventListener("blur", function(event) {
            
                if(calendar.validateDate(this.id) == false)
                {
                    alert("input format date has to be dd-mmm-yyyy");
                }
            }
            
        );
        
        inputCalendarDueDateFormGridPaging.placeholder = "dd-mmm-yyyy";


        inputCalendarTestingFormGridPaging.addEventListener("blur", function(event) {
            
                if(calendar.validateDate(this.id) == false)
                {
                    alert("input format date has to be dd-mmm-yyyy");
                }
            }
            
        );
        
        inputCalendarTestingFormGridPaging.placeholder = "dd-mmm-yyyy";


        inputCalendarDueDateFormGridPagingIcon.addEventListener("click", function(event) {

                var divCalendar = document.getElementById(divCalendarId);

                if(divCalendar.style.display == "block")
                {
                    calendar.showHideCalendar('hide' ,'dueDate', divCalendarId, monthsArray);
                }
                else
                if(divCalendar.style.display == "none")
                {
                    calendar.showHideCalendar('show' ,'dueDate', divCalendarId, monthsArray);
                }
            
            }

        );

        inputCalendarPaidDateFormGridPagingIcon.addEventListener("click", function(event) {

                var divCalendar = document.getElementById(divCalendarId);

                if(divCalendar.style.display == "block")
                {
                    calendar.showHideCalendar('hide' ,'paidDate', divCalendarId, monthsArray);
                }
                else
                if(divCalendar.style.display == "none")
                {
                    calendar.showHideCalendar('show' ,'paidDate', divCalendarId, monthsArray);
                }			
            }
        );
    }

}