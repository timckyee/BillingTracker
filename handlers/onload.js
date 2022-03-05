
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
    
    onload.loadBillingAccounts();

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

    //sessionStorage.setItem("loggedIn", "false");
}

/**
 * Class for onload functions
 * @class
 **/
 BillingTracker.Onload = function() {
	
};

BillingTracker.Onload.prototype = {

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
         
         window.getXmlHttpRequest.open("GET", "../php/grid_get_post.php" + "?" + queryString, true);
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
        
        inputCalendarBillingDateFormGridPaging.placeholder = "dd-mmm-yyyy";

        
        inputCalendarDueDateFormGridPaging.addEventListener("blur", function(event) {
            
                if(calendar.validateDate(this.id) == false)
                {
                    alert("input format date has to be dd-mmm-yyyy");
                }
            }
            
        );
        
        inputCalendarDueDateFormGridPaging.placeholder = "dd-mmm-yyyy";


        inputCalendarPaidDateFormGridPaging.addEventListener("blur", function(event) {
            
                if(calendar.validateDate(this.id) == false)
                {
                    alert("input format date has to be dd-mmm-yyyy");
                }
            }
            
        );
        
        inputCalendarPaidDateFormGridPaging.placeholder = "dd-mmm-yyyy";


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