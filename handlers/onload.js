
var images = [];

document.getElementById("billingTracker").onload = function() {
    
    /*
    var loggedIn = sessionStorage.getItem("loggedIn");

    if(loggedIn != "true")
    {
        window.location.href = "../index.html";
        return;
    }
    */

    var onload = new BillingTracker.Onload();

    //onload.htmlBody_init_class();

    onload.set_page_type();

    onload.init_gridGetPost_xmlHttpRequests();    

    onload.init_calendar_inputs();

    sessionStorage.setItem("gridBillsFormGridPagingPageNumber", "1");

    document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = "1";

    //sessionStorage.setItem("arraySortColumn", "DueDate");
    
    //sessionStorage.setItem("arraySortDirection", "desc");
    
    var server = new BillingTracker.Config();
            
    var helper = new BillingTracker.Helper();
    
    helper.preload(
        [server.getServerUrl() + "/images/pngfuel.com.up.gif", 
        server.getServerUrl() + "/images/pngfuel.com.down.gif"]
    );

    //sessionStorage.setItem("loggedIn", "false");


    if(sessionStorage.getItem("onLoad") == "true")
    {
        // if logging in do not reload form values
        sessionStorage.setItem("onLoad", "false");
        onload.loadBillingAccounts();
    }
    else
    {
        // if not logging in and refreshing page, reload form values
        onload.loadBillingAccounts("true");        
    }

}

/**
 * Class for onload functions
 * @class
 **/
 BillingTracker.Onload = function() {
	
};

BillingTracker.Onload.prototype = {

    /**
     * reload form values
     * @function
     * @name Onload#reload_form_values
     **/
     reload_form_values: function() {
        
        var form_billingAccountsSelectList = sessionStorage.getItem("form_billingAccountsSelectList");
        document.getElementById("billingAccountsSelectList").value = form_billingAccountsSelectList;
        

        var form_billingAccountId = sessionStorage.getItem("form_billingAccountId");
        document.getElementById("billingAccountId").value = form_billingAccountId;


        // no billing account selected or no sort column or direction then do not repopulate form
        var billingAccount = form_billingAccountId;

        var column = sessionStorage.getItem("arraySortColumn");
        var direction = sessionStorage.getItem("arraySortDirection");
        
        if(billingAccount == "" || column == null || direction == null)
            return;


        var form_accountName = sessionStorage.getItem("form_accountName");
        document.getElementById("accountName").value = form_accountName;    
        
        var form_accountNumber = sessionStorage.getItem("form_accountNumber");
        document.getElementById("accountNumber").value = form_accountNumber;         

        var form_accountUserName = sessionStorage.getItem("form_accountUserName");
        document.getElementById("accountUserName").value = form_accountUserName;


        var form_billsFormGridPagingSearchValue = sessionStorage.getItem("form_billsFormGridPagingSearchValue");
        document.getElementById("billsFormGridPagingSearchValue").value = form_billsFormGridPagingSearchValue;

        var form_billsPrimaryKey = sessionStorage.getItem("form_billsPrimaryKey");
        document.getElementById("billsPrimaryKey").value = form_billsPrimaryKey;

        var form_billingDate = sessionStorage.getItem("form_billingDate");
        document.getElementById("billingDate").value = form_billingDate;

        var form_dueDate = sessionStorage.getItem("form_dueDate");
        document.getElementById("dueDate").value = form_dueDate;

        var form_amountDue = sessionStorage.getItem("form_amountDue");
        document.getElementById("amountDue").value = form_amountDue;

        var form_billingNumber = sessionStorage.getItem("form_billingNumber");
        document.getElementById("billingNumber").value = form_billingNumber;

        var form_paidDate = sessionStorage.getItem("form_paidDate");
        document.getElementById("paidDate").value = form_paidDate;

        var form_paymentMethod = sessionStorage.getItem("form_paymentMethod");
        document.getElementById("paymentMethod").value = form_paymentMethod;

        var form_amountPaid = sessionStorage.getItem("form_amountPaid");
        document.getElementById("amountPaid").value = form_amountPaid;


        var form_gridGetPostBillsFormGridPagingPageNumber = sessionStorage.getItem("form_gridGetPostBillsFormGridPagingPageNumber");
        document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = form_gridGetPostBillsFormGridPagingPageNumber;

        //var pageSession = sessionStorage.getItem("form_gridGetPostBillsFormGridPagingPageNumberSession"));

        // if entering search term, clicking on search, and no records
        // or entering search term as empty and refreshing the page the page number is 0
        // if this is the case then records are shown without filter and set page number to 1
        if(form_gridGetPostBillsFormGridPagingPageNumber == "0")
        {
            document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = "1";
        }

        
        document.getElementById("gridBillsFormGridPaging").style.display = "block";
        
        var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();			
    
        var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();

        var callback = new BillingTracker.Callback();

        var bills_form = new BillingTracker.BillsForm();

        
        var arrayOldValuesTable = bills_form.arrayOldValuesTable;

        arrayOldValuesTable["billingDate"] = document.getElementById("billingDate").value;
        arrayOldValuesTable["dueDate"] = document.getElementById("dueDate").value;
        arrayOldValuesTable["billingNumber"] = document.getElementById("billingNumber").value;
        arrayOldValuesTable["amountDue"] = document.getElementById("amountDue").value;
        arrayOldValuesTable["paidDate"] = document.getElementById("paidDate").value;
        arrayOldValuesTable["paymentMethod"] = document.getElementById("paymentMethod").value;
        arrayOldValuesTable["amountPaid"] = document.getElementById("amountPaid").value;
        
        var highlightId = sessionStorage.getItem("highlightRowId");
        
        var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;

        if(document.getElementById("gridScrollNote") != null)
        {
            document.getElementById("gridScrollNote").style.display = "block";
        }


        //var totalPagesText = sessionStorage.getItem("form_gridGetPostBillsFormGridPagingPages");

        //var totalPages = totalPagesText.substring(3, totalPagesText.length);

        var pageNumber;

        //debugger

        if(sessionStorage.getItem("onInputSearchClear") == "true")
        {
            pageNumber = 1;
        }
        else
        {
            /*
            if(parseInt(form_gridGetPostBillsFormGridPagingPageNumber) > parseInt(totalPages))
            {
                pageNumber = 1;
            }
            else
            {
                pageNumber = form_gridGetPostBillsFormGridPagingPageNumber;
            } 
            */

            pageNumber = form_gridGetPostBillsFormGridPagingPageNumber;

            sessionStorage.setItem("onInputSearchClear", "false");
        }

        document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = pageNumber;

        if(searchValue == "" || searchValue == undefined)
        {
            grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryName(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, '', '', callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumber, highlightId, bills_form_grid_paging.getPageSize());
        }
        else
        {
            grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryNameSearch(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, "searchValue", searchValue, callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumber, highlightId, bills_form_grid_paging.getPageSize());
        }
    },
    
    /**
     * navigation type
     * @function
     * @name Onload#reload_form_values
     **/     
     navigationType: function() {
 
        var p; 
    
        if (window.performance.getEntriesByType("navigation")) {
           p=window.performance.getEntriesByType("navigation")[0].type;
    
           if (p=='navigate'){result=0}
           if (p=='reload'){result=1}
           if (p=='back_forward'){result=2}
           if (p=='prerender'){result=3}
        }
        return result;
    },

    /**
     * set page type
     * @function
     * @name Onload#set_page_type
     **/
     set_page_type: function() {

        var helper = new BillingTracker.Helper();

        var platform = helper.checkPlatform();

        if(platform == "android")
        {
            sessionStorage.setItem("currentPage", "android");
        }
        else
        if(platform == "desktop_chrome")
        {
            sessionStorage.setItem("currentPage", "desktop_chrome");
        }        
        else
        if(platform == "IOS")
        {
            sessionStorage.setItem("currentPage", "IOS");
        }

    },

    /**
     * init html body
     * @function
     * @name Onload#htmlBody_init_class
     **/
    htmlBody_init_class: function() {

        var helper = new BillingTracker.Helper();

        var platform = helper.checkPlatform();

        /*
        if(platform == "android")
        {
            document.body.className = "bodyAndroid";
        }
        else
        if(platform == "desktop_chrome")
        {
            document.body.className = "bodyDesktop";
        }        
        else
        if(platform == "IOS")
        {
            document.body.className = "bodyIOS";
        }
        */

    },

    /**
     * init grid get post http requests
     * @function
     * @name Onload#init_gridGetPost_xmlHttpRequests
     **/
    init_gridGetPost_xmlHttpRequests: function() {
        
        window.gridXmlHttpRequest = new XMLHttpRequest();
        window.getXmlHttpRequest = new XMLHttpRequest();
        window.postXmlHttpRequest = new XMLHttpRequest();
        window.getPageNumberHttpRequest = new XMLHttpRequest();
        
    },

	/**
	 * Load the Billing Accounts in the select box
	 * @function
	 * @name Onload#loadBillingAccounts
	 **/
     loadBillingAccounts: function(reload) 
     {
        window.getXmlHttpRequest.onreadystatechange = function() {
         
             if (this.readyState == 4 && this.status == 200) {

                 var response = JSON.parse(this.responseText);
                
                 var select = "";
     
                 select += "<option value=\"\"></option>";
     
                 for (item in response) {
                     select += "<option value=\"" + response[item].BillingAccountId + "\">" + response[item].AccountName + "</option>";
                 }
 
                 document.getElementById("billingAccountsSelectList").innerHTML = select;

                 var onload = new BillingTracker.Onload();
                 onload.loadPaymentMethods(reload);                 
             }
         }
 
         var queryString;
     
         queryString = "queryName" + "=" + "billingAccounts";
         
         window.getXmlHttpRequest.open("GET", "../php/grid_get_post.php" + "?" + queryString, true);
         window.getXmlHttpRequest.send();
     },

	/**
	 * Load the Payment Methods in the select box
	 * @function
	 * @name Onload#loadPaymentMethods
	 **/
     loadPaymentMethods: function(reload) 
     {
        window.getXmlHttpRequest.onreadystatechange = function() {
         
             if (this.readyState == 4 && this.status == 200) {
 
                 var response = JSON.parse(this.responseText);
     
                 var select = "";
     
                 select += "<option value=\"\"></option>";
     
                 for (item in response) {
                     select += "<option value=\"" + response[item].PaymentMethodId + "\">" + response[item].PaymentMethod + "</option>";
                 }
 
                 document.getElementById("paymentMethod").innerHTML = select;

                if(reload == "true")
                {
                    // reload the form values
                    var onload = new BillingTracker.Onload();

                    // if navigation type is reload
                    //if(onload.navigationType() == 1)
                    //{             
                    onload.reload_form_values();
                    //}
                }

             }
         }
 
         var queryString;
     
         queryString = "queryName" + "=" + "paymentMethods";
         
         window.getXmlHttpRequest.open("GET", "../php/grid_get_post.php" + "?" + queryString, true);
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

        var inputCalendarBillingDateFormGridPaging = document.getElementById('billingDate');

        var inputCalendarDueDateFormGridPaging = document.getElementById('dueDate');

        var inputCalendarPaidDateFormGridPaging = document.getElementById('paidDate');


        var inputCalendarBillingDateFormGridPagingIcon = document.getElementById('inputCalendarBillingDateFormGridPagingIcon');

        var inputCalendarDueDateFormGridPagingIcon = document.getElementById('inputCalendarDueDateFormGridPagingIcon');

        var inputCalendarPaidDateFormGridPagingIcon = document.getElementById('inputCalendarPaidDateFormGridPagingIcon');


        inputCalendarBillingDateFormGridPaging.addEventListener("blur", function(event) {
            
                if(calendar.validateDate(this.id) == false)
                {
                    alert("input format date has to be dd-mmm-yyyy");
                }
            }
        
        );
        
        inputCalendarDueDateFormGridPaging.addEventListener("blur", function(event) {
            
                if(calendar.validateDate(this.id) == false)
                {
                    alert("input format date has to be dd-mmm-yyyy");
                }
            }
            
        );

        inputCalendarPaidDateFormGridPaging.addEventListener("blur", function(event) {
            
                if(calendar.validateDate(this.id) == false)
                {
                    alert("input format date has to be dd-mmm-yyyy");
                }
            }
            
        );
        

        var helper = new BillingTracker.Helper();

        var platform = helper.checkPlatform();

        if(platform == "desktop_chrome" || platform == "IOS")
        {
            inputCalendarBillingDateFormGridPaging.placeholder = "dd-mmm-yyyy";
            inputCalendarDueDateFormGridPaging.placeholder = "dd-mmm-yyyy";
            inputCalendarPaidDateFormGridPaging.placeholder = "dd-mmm-yyyy";
        }


        inputCalendarBillingDateFormGridPagingIcon.addEventListener("click", function(event) {

                var divCalendar = document.getElementById(divCalendarId);

                if(divCalendar.style.display == "block")
                {
                    calendar.showHideCalendar('hide' ,'billingDate', divCalendarId, monthsArray);
                }
                else
                if(divCalendar.style.display == "none")
                {
                    calendar.showHideCalendar('show' ,'billingDate', divCalendarId, monthsArray);
                }
            
            }

        );

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