/**
 * The app controller to save Billing Account and Billing Account User Bills
 * @class
 **/
 BillingTracker.Controller = function () {
		
};

BillingTracker.Controller.prototype = {
	
	/**
	 * Save the suite form values
	 * @function
	 * @name Controller#suiteSave
	 **/
	saveBillingAccount: function() {

        var billingAccountId = document.getElementById("billingAccountId").value;
        var accountName = document.getElementById("accountName").value;
        var accountNumber = document.getElementById("accountNumber").value;
        var accountUserName = document.getElementById("accountUserName").value;

        if(accountName == "")
        {
            alert("Account Name is required");
            return;
        }
        
        if(accountNumber == "")
        {
            alert("Account Number is required");
            return;
        }

        if(document.getElementById("billingAccountId").value == "")
        {
            if (confirm("Creating new billing account") == false) {
                return;
            }

            var insertString = "(AccountName, AccountNumber, AccountUserName) values ('" + accountName + "','" + accountNumber + "','" + accountUserName + "')"; 
            
            window.postXmlHttpRequest.onreadystatechange = function() {
            
                if (this.readyState == 4 && this.status == 200) {

                    var response = JSON.parse(this.responseText);

                    document.getElementById("billingAccountId").value = response;

                    var onload = new BillingTracker.Onload();
                    onload.loadBillingAccounts();
                }
            }

            var formVariables = "postType=" + "createBillingAccount" + "&insertString" + "=" + encodeURIComponent(insertString);
                
            window.postXmlHttpRequest.open("POST", "php/grid_get_post.php", true);
            window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            window.postXmlHttpRequest.send(formVariables);
        }
        else
        {
            if (confirm("Updating new billing account information") == false) {
                return;
            }
            
            var updateString = "AccountName='" + accountName + "', AccountNumber = '" + accountNumber + "', AccountUserName='" + accountUserName + "'";
            
            window.postXmlHttpRequest.onreadystatechange = function() {
            
                if (this.readyState == 4 && this.status == 200) {

                    //var response = JSON.parse(this.responseText);

                    var onload = new BillingTracker.Onload();
                    onload.loadBillingAccounts();                    
                }
            }

            var formVariables = "postType=" + "updateBillingAccount" + "&billingAccountId=" + billingAccountId + "&updateString" + "=" + encodeURIComponent(updateString);
                
            window.postXmlHttpRequest.open("POST", "php/grid_get_post.php", true);
            window.postXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            window.postXmlHttpRequest.send(formVariables);

        }
    },

	/**
	 * Save the bills form grid paging values
	 * @function
	 * @name Controller#billsFormGridPagingSave
	 **/
     billsFormGridPagingSave: function() {
        
		var saveType;
		
		var inputPrimaryKey = document.getElementById("billsPrimaryKey").value;
        var inputBillingDate = document.getElementById("billingDate").value;
		var inputDueDate = document.getElementById("dueDate").value;
        var inputBillingNumber = document.getElementById("billingNumber").value;
        var inputAmountDue = document.getElementById("amountDue").value;
        var inputPaidDate = document.getElementById("paidDate").value;
        var selectPaymentMethod = document.getElementById("paymentMethod").value;
        var inputAmountPaid = document.getElementById("amountPaid").value;
		
		var BillsFormGridValues = new Array();
		
        BillsFormGridValues["billingDate"] = inputBillingDate;
		BillsFormGridValues["dueDate"] = inputDueDate;
		BillsFormGridValues["billingNumber"] = inputBillingNumber;		
		BillsFormGridValues["amountDue"] = inputAmountDue;
		BillsFormGridValues["paidDate"] = inputPaidDate;
        BillsFormGridValues["paymentMethod"] = selectPaymentMethod;
		BillsFormGridValues["amountPaid"] = inputAmountPaid;

		if(inputPrimaryKey != "")
		{
			saveType = "update";
		}
		else
		{
			saveType = "insert";
		}

		var billsForm = new BillingTracker.BillsForm();	
		
		if(saveType == "update") 
		{
            billsForm.setFieldValuesFromInputs(BillsFormGridValues, inputPrimaryKey);
            billsForm.billsFormGridUpdate();
		}
		else if(saveType == "insert") 
		{
			billsForm.setFieldValuesFromInputs(BillsFormGridValues, "");
			billsForm.billsFormGridInsert();			
		}
	},

    /**
	 * Set the bills form grid paging values to empty
	 * @function
	 * @name Controller#resetBillsFormGridPagingFields
	 **/
	resetBillsFormGridPagingFields: function() {
		
		var billsFormGridPaging = new BillingTracker.BillsForm();
		
		var fieldsInfo = billsFormGridPaging.getFieldsInfo();
		
		for(i=0; i<fieldsInfo.length; i++)
		{
			document.getElementById(fieldsInfo[i].htmlObjectId).value = "";
		}
		
	},
}