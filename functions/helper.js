/**
 * Class for Helper functions
 * @class
 **/
 BillingTracker.Helper = function() {
	
};

BillingTracker.Helper.prototype = {

    /**
     * Sets the bills form grid paging search field value
     * @function
     * @name Helper#setBillsFormGridPagingSearchValue
     **/
    setBillsFormGridPagingSearchValue: function() {

        var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;

        var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();

        bills_form_grid_paging.setSearchValue(searchValue);

    },

    /**
     * Sets the bills form grid paging search field to null
     * @function
     * @name Helper#setBillsFormGridPagingSearchValueNull
     **/
     setBillsFormGridPagingSearchValueNull: function() {

        var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();

        bills_form_grid_paging.setSearchValue("");

    },   

    /**
     * Show the bills form grid paging records with search filter
     * @function
     * @name Helper#getBillsFormGridPagingSearchValue
     **/
    getBillsFormGridPagingSearchValue: function() {

        var sortColumn = "DueDate";
        var sortDirection = "desc";

        sessionStorage.setItem("arraySortColumn", sortColumn);

        sessionStorage.setItem("arraySortDirection", sortDirection);

        sessionStorage.setItem("sortOnload", "true");

        var pageNumber = "1";
        
        var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
			
        var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();
        
        var callback = new BillingTracker.Callback();

        var billingAccount = document.getElementById("billingAccountId").value;

        if(billingAccount == "")
        {
            alert("Billing Account has to be selected");
            return;
        }

        var highlightId = sessionStorage.getItem("highlightRowId");

        var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;

        grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryNameSearch(),
        bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, "searchValue", searchValue, callback.gridCallback, bills_form_grid_paging.getRowOnClick(), sortColumn, sortDirection, pageNumber, highlightId, bills_form_grid_paging.getPageSize());

        sessionStorage.setItem("gridBillsFormGridPagingPageNumber", "1");

        document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = "1";
    
        if(document.getElementById("billsFormGridPagingSearchValue").value == "")
        {
            sessionStorage.setItem("showGridWithStoredSortingPage", "false");
        }
        else
        {
            sessionStorage.setItem("showGridWithStoredSortingPage", "true");
        }
    },

    /**
	 * Billing account select box change event
	 * @function
	 * @name Helper#billingAccountsSelectListChange
	 **/
     billingAccountsSelectListChange: function(obj) 
     {
        if(obj.value == "")
        {
            document.getElementById("billingAccountId").value = "";
            document.getElementById("accountName").value = "";
            document.getElementById("accountNumber").value = "";
            document.getElementById("accountUserName").value = "";
            document.getElementById("billsPrimaryKey").value = "";
            document.getElementById("billingDate").value = "";
            document.getElementById("dueDate").value = "";
            document.getElementById("billingNumber").value = "";
            document.getElementById("amountDue").value = "";
            document.getElementById("paidDate").value = "";
            document.getElementById("paymentMethod").value = "";
            document.getElementById("amountPaid").value = "";

            document.getElementById("gridBillsFormGridPaging").innerHTML = "";

            if(document.getElementById("gridScrollNote") != null)
            {
                document.getElementById("gridScrollNote").style.display = "none";
            }

            document.getElementById("gridGetPostBillsFormGridPagingFooter").style.display = "none";

            if(document.getElementById("saveNewButtonBillsFormGridPaging") != null)
            {
                document.getElementById("saveNewButtonBillsFormGridPaging").style.display = "none";
            }

            return;
        }

        window.getXmlHttpRequest.onreadystatechange = function() {
         
            if (this.readyState == 4 && this.status == 200) {

                var response = JSON.parse(this.responseText);
                
                document.getElementById("billingAccountId").value = response[0].BillingAccountId;
                document.getElementById("accountName").value = response[0].AccountName;
                document.getElementById("accountNumber").value = response[0].AccountNumber;
                document.getElementById("accountUserName").value = response[0].AccountUserName;

                var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
			
                var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();
            
                var callback = new BillingTracker.Callback();

                var sortColumn = "DueDate";
                var sortDirection = "desc";

                sessionStorage.setItem("arraySortColumn", sortColumn);
    
                sessionStorage.setItem("arraySortDirection", sortDirection);

                sessionStorage.setItem("showGridWithStoredSortingPage", "false");

                sessionStorage.setItem("sortOnload", "true");

                var pageNumber = "1";
            
                var billingAccount = document.getElementById("billingAccountId").value;

                var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;
                
                /*
                if(searchValue != "")
                {
                    var helper = new BillingTracker.Helper();
                    helper.setBillsFormGridPagingSearchValueNull();
                }
                */

                document.getElementById(bills_form_grid_paging.getBillsGridPagingDiv()).style.display = "block";

                document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value = "1";

                document.getElementById("billsFormGridPagingSearchValue").value = "";

                sessionStorage.setItem("highlightRowId", "");

                var helper = new BillingTracker.Helper();
                helper.newBill();

                if(document.getElementById("gridScrollNote") != null)
                {
                    document.getElementById("gridScrollNote").style.display = "block";
                }

                grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryName(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, '', '',callback.gridCallback, bills_form_grid_paging.getRowOnClick(), sortColumn, sortDirection, pageNumber, '', bills_form_grid_paging.getPageSize());
            }
        }

        var queryString;
    
        queryString = "queryName=" + "billingAccountLoad" + "&billingAccountId=" + obj.value;
        
        window.getXmlHttpRequest.open("GET", "../php/grid_get_post.php" + "?" + queryString, true);
        window.getXmlHttpRequest.send();        

     },

    /**
	 * Go to the view bills not paid grid
	 * @function
	 * @name Helper#goToViewBillsNotPaid
	 **/

     goToViewBillsNotPaid: function() {

        window.location.href = "../view/notpaid.html";

     },

    /**
	 * Logout of system
	 * @function
	 * @name Helper#logout
	 **/
    logout: function() {
    
        if (confirm("Continue with Logout?") == false) {
            return;
        }
        else
        {
            window.location.href = "../index.html";
        }

    },
     
    /**
	 * New billing account reset billing account fields
	 * @function
	 * @name Helper#newBillingAccount
	 **/
     newBillingAccount: function() {

        document.getElementById("billingAccountsSelectList").selectedIndex  = 0;

        document.getElementById("billingAccountId").value = "";
        document.getElementById("accountName").value = "";
        document.getElementById("accountNumber").value = "";
        document.getElementById("accountUserName").value = "";
        
        document.getElementById("billsPrimaryKey").value = "";
        document.getElementById("billingDate").value = "";
        document.getElementById("dueDate").value = "";
        document.getElementById("billingNumber").value = "";
        document.getElementById("amountDue").value = "";
        document.getElementById("paidDate").value = "";
        document.getElementById("paymentMethod").value = "";
        document.getElementById("amountPaid").value = "";

        document.getElementById("gridBillsFormGridPaging").innerHTML = "";

        if(document.getElementById("gridScrollNote") != null)
        {
            document.getElementById("gridScrollNote").style.display = "none";
        }

        document.getElementById("gridGetPostBillsFormGridPagingFooter").style.display = "none";
     },

    /**
	 * New bill reset bill fields
	 * @function
	 * @name Helper#newBill
	 **/     
     newBill: function() {

        document.getElementById("billsPrimaryKey").value = "";
        document.getElementById("billingDate").value = "";
        document.getElementById("dueDate").value = "";
        document.getElementById("billingNumber").value = "";
        document.getElementById("amountDue").value = "";
        document.getElementById("paidDate").value = "";
        document.getElementById("dueDate").value = "";
        document.getElementById("paymentMethod").value = "";
        document.getElementById("amountPaid").value = "";
     
        sessionStorage.setItem("highlightRowId", "");

        var helper = new BillingTracker.Helper();

        helper.resetRowHighlight("tableBillsFormGridPaging");

     },

    /**
     * keyUp function on input box to detect clearing of input text
     * @function
     * @name Helper#keyUp_input_search
     * 
     * @param {string} val the value in the search text box
     **/     
    keyUp_input_search: function(val) {

        if (val == "") {

            sessionStorage.setItem("showGridWithStoredSortingPage", "false");

        }
    },

    /**
     * Convert month number to month character string
     * @function
     * @name Helper#dateMonthStringToNumberConversion
     * 
     * @param {string} monthNumber the month number we are converting
     **/
    dateMonthNumberToStringConversion: function(monthNumber)
    {
        var monthArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        
        return monthArray[parseInt(monthNumber) - 1];
    },

    /**
     * Convert date from database to dd-mmm-yyyy format
     * @function
     * @name Helper#convertDateFromDatabase
     * 
     * @param {string} date the date from the database
     **/
    convertDateFromDatabase: function(date)
    {	
        if(date != null)
        {
            var dateFromDatabase = date;
            
            var year = dateFromDatabase.substring(0,4);
            var month = dateFromDatabase.substring(5,7);
            var day = dateFromDatabase.substring(8,10);
            
            var dateFormat = day + "-" + this.dateMonthNumberToStringConversion(month) + "-" + year;
            
            return dateFormat;
        }
    },
    
    /**
     * Convert date from system to database yyyy-mm-dd format
     * @function
     * @name Helper#convertDateFromSystem
     * 
     * @param {string} date the date from the system
     **/
    convertDateFromSystem: function(date)
    {	
        var dateFromSystem = date;
        
        var day = dateFromSystem.substring(0,2);
        var month = dateFromSystem.substring(3,6);
        var year = dateFromSystem.substring(7,11);
        
        var dateFormat = year + "-" + this.dateMonthStringToNumberConversion(month) + "-" + day;
        
        return dateFormat;
    
    },

    /**
     * Convert month character string to number string
     * @function
     * @name Helper#dateMonthStringToNumberConversion
     * 
     * @param {string} monthString the month as character string
     **/
    dateMonthStringToNumberConversion: function(monthString)
    {
        var monthArray = [];
        
        monthArray["jan"] = "01";
        monthArray["feb"] = "02";
        monthArray["mar"] = "03";
        monthArray["apr"] = "04";
        monthArray["may"] = "05";
        monthArray["jun"] = "06";
        monthArray["jul"] = "07";
        monthArray["aug"] = "08";
        monthArray["sep"] = "09";
        monthArray["oct"] = "10";
        monthArray["nov"] = "11";
        monthArray["dec"] = "12";
        
        return monthArray[monthString];
    },

    /**
     * Preload images in the onload handler
     * @function
     * @name Helper#preload
     * 
     * @param {Array} preload array of images including path
     **/
    preload: function(preload) {

        for (i = 0; i < preload.length; i++) {
            images[i] = new Image();
            images[i].src = preload[i];
        }
    },

    /**
     * Clear the row highlight for the given table
     * @function
     * @name Helper#resetRowHighlight
     * 
     * @param {string} tableHtmlObjectId the html table object
     **/
    resetRowHighlight: function(tableHtmlObjectId) {

        var tableReset = document.getElementById(tableHtmlObjectId);

        if(tableReset == null)
            return;

        var row;

        for(var i=0; i<tableReset.rows.length; i++)
        {
            if(i == 0)
                continue;
                
            row = tableReset.rows[i];
            row.className = "tableHover";
        }	

    },

    /**
     * Update the grid page number (setting input box beside the go button) and refresh the grid
     * @function
     * @name Helper#updateGridPage
     * 
     * @param {string} object points to the current html object (this)
     * @param {string} pageNumber gridGetPostHomePagingPageNumber input box value
     **/
    updateGridPage: function(object, pageNumber)
    { 
        if(isNaN(parseInt(pageNumber)))
        {
            alert('Page number has to be an integer');
            return;
        }
    
        if(pageNumber == "0")
        {
            alert('Please enter page number greater than 0');
            return;
        }
    
        var pagingFooter = object.parentNode.id;
    
        var pageNumberUpdate;

        if(pagingFooter == "gridGetPostBillsFormGridPagingFooter")
        {      
            var inputPage = document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value;
            var totalPagesString = document.getElementById("gridGetPostBillsFormGridPagingPages").innerText;
            var totalPages = totalPagesString.substr(3, totalPagesString.length);
            
            if(parseInt(inputPage) > totalPages)
            {
                alert('This page number is greater than the total number of pages');
                return;
            }
    
            sessionStorage.setItem("gridBillsFormGridPagingPageNumber", pageNumber);
                
            pageNumberUpdate = sessionStorage.getItem("gridBillsFormGridPagingPageNumber");
            
            var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
                
            var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();
            
            var callback = new BillingTracker.Callback();
        
            var column = sessionStorage.getItem("arraySortColumn");
            var direction = sessionStorage.getItem("arraySortDirection");       

            var billingAccount = document.getElementById("billingAccountId").value;
        
            var highlightId = sessionStorage.getItem("highlightRowId");

            var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;
            
            sessionStorage.setItem("showGridWithStoredSortingPage", "true");

            if(searchValue == "" || searchValue == undefined)
            {
                grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryName(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, '', '',callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumberUpdate, highlightId, bills_form_grid_paging.getPageSize());
            }
            else
            {
                grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryNameSearch(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, "searchValue", searchValue, callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumberUpdate, highlightId, bills_form_grid_paging.getPageSize());
            }
        }
    },

    /**
     * Click on the left or right arrows to update the grid page number and refresh the grid
     * @function
     * @name Helper#updateGridPageArrows
     * 
     * @param {string} object points to the current html object (this) 
     * @param {string} direction the left or right arrow
     * @param {string} pageNumber gridGetPostHomePagingPageNumber input box value before the update
     **/
    updateGridPageArrows: function(object, direction, pageNumber)
    { 
        
        if(isNaN(parseInt(pageNumber)))
        {
            alert('Page number has to be an integer');
            return;
        }
    
        if(pageNumber == "0")
        {
            alert('Please enter page number greater than 0');
            return;
        }
        
        var inputPage = document.getElementById("gridGetPostBillsFormGridPagingPageNumber").value;
        var totalPagesString = document.getElementById("gridGetPostBillsFormGridPagingPages").innerText;
        var totalPages = totalPagesString.substr(3, totalPagesString.length);
        
        if(parseInt(inputPage) > totalPages)
        {
            alert('This page number is greater than the total number of pages');
            return;
        }

        var pageNumberUpdate;
    
        var pagingFooter = object.parentNode.id;

        if(pagingFooter == "gridGetPostBillsFormGridPagingFooter")
        {    
            if(direction == "left") {
                if(pageNumber == "1") {
                    alert('You are on the first page');
                    return;
                } else {
                    pageNumberUpdate = parseInt(pageNumber) - 1;
                    document.getElementById('gridGetPostBillsFormGridPagingPageNumber').value = pageNumberUpdate;
                }
            } else if(direction == "right") {

                var inputPage = pageNumber;
                var totalPagesString = document.getElementById("gridGetPostBillsFormGridPagingPages").innerText;
                var totalPages = totalPagesString.substr(3, totalPagesString.length);
                
                if(parseInt(inputPage) == parseInt(totalPages))
                {
                    alert('You have reached the last page');
                    return;
                }
                
                pageNumberUpdate = parseInt(pageNumber) + 1;
                document.getElementById('gridGetPostBillsFormGridPagingPageNumber').value = pageNumberUpdate;
            }
        
            sessionStorage.setItem("gridBillsFormGridPagingPageNumber", pageNumberUpdate.toString());		
        
            var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
                
            var bills_form_grid_paging = new BillingTracker.BillsFormGridPaging();
            
            var callback = new BillingTracker.Callback();
        
            var column = sessionStorage.getItem("arraySortColumn");
            var direction = sessionStorage.getItem("arraySortDirection");

            var billingAccount = document.getElementById("billingAccountId").value;

            var highlightId = sessionStorage.getItem("highlightRowId");

            var searchValue = document.getElementById("billsFormGridPagingSearchValue").value;

            sessionStorage.setItem("showGridWithStoredSortingPage", "true");

            if(searchValue == "" || searchValue == undefined)
            {
                grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryName(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount, '', '',callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumberUpdate.toString(), highlightId, bills_form_grid_paging.getPageSize());
            }
            else
            {
                grid_get_post_functions.grid(bills_form_grid_paging.getGridGetPostDivElement(), bills_form_grid_paging.getPhpFile(), bills_form_grid_paging.getRefreshBillsGridQueryNameSearch(), bills_form_grid_paging.getGridIdField(), bills_form_grid_paging.getGridColumnsInfo(), bills_form_grid_paging.getTableHtmlObjectId(), "billingAccountId", billingAccount,"searchValue", searchValue, callback.gridCallback, bills_form_grid_paging.getRowOnClick(), column, direction, pageNumberUpdate.toString(), highlightId, bills_form_grid_paging.getPageSize());
            }
        }
    },

    /**
     * Check the platform which is in use
     * @function
     * @name Helper#checkPlatform
     **/
    checkPlatform: function() {

        var isIOS_safari = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);

        var isAndroid = /Android/i.test(navigator.userAgent);

        if(isIOS_safari == false && isIOS == false && isAndroid == false)
        {
            if(navigator.userAgent.indexOf('Chrome') != -1)
            {
                return "desktop_chrome";
            }
            else
            {
                return "desktop_safari";
            }
        }
        else
        if(isIOS_safari == true)
        {
            return "IOS_safari";
        }
        else
        if(isIOS == true)
        {
            return "IOS";
        }
        else
        if(isAndroid == true)
        {
            return "android";
        }

    }

}
