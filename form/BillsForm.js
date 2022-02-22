/**
 * Class for BillsForm form object
 * @class
 **/
 BillingTracker.BillsForm = function() {
	
	this.BillsId;
	this.DueDate;
	this.BillingNumber;	
	this.AmountDue;
	this.PaidDate;
	this.PaymentMethod;
    this.AmountPaid;

	this.fields = [
		{ name: "BillsId", dbType: "int", htmlObjectId: "billsPrimaryKey", htmlObjectType: "primaryKey" },
		{ name: "BillingDate", dbType: "date", htmlObjectId: "billingDate", htmlObjectType: "calendar", description: "Billing Date" },
		{ name: "DueDate", dbType: "date", htmlObjectId: "dueDate", htmlObjectType: "calendar", description: "Due Date" },
		{ name: "BillingNumber", dbType: "string", htmlObjectId: "billingNumber", htmlObjectType: "text", description: "Billing Number" },		
		{ name: "AmountDue", dbType: "float", htmlObjectId: "amountDue", htmlObjectType: "text", description: "Amount Due" },
		{ name: "PaidDate", dbType: "date", htmlObjectId: "paidDate", htmlObjectType: "calendar", description: "Paid Date" },
        { name: "PaymentMethod", dbType: "int", htmlObjectId: "paymentMethod", htmlObjectType: "select", description: "Payment Method" },
        { name: "AmountPaid", dbType: "float", htmlObjectId: "amountPaid", htmlObjectType: "text", description: "Amount Paid" }
    ];
		
	this.phpFileGridGetPost = "php/grid_get_post.php";

	this.billsUpdateQueryName = "updateTableBillingAccountUserBills";

	this.recordExist = "recordExistsHomeTenantFormGridPaging";

	this.tableNameInDb = "BillingAccountUserBills";

	this.billsInsertQueryName = "createRecordBillingAccountUserBills";
	
};

BillingTracker.BillsForm.prototype = {
			
	/**
	 * Array to store old values for inserting and updating records in Tenant form grid paging object
	 * @var {Array} arrayOldValuesTable
	 **/		
	arrayOldValuesTable: [],
	
	getFieldsInfo: function() {
		
		return this.fields;
	},
	
	getTableNameInDb: function() {

		return this.tableNameInDb;

	},

	getAutocompleteInputs: function() {
	
		return this.autocomplete_inputs;
		
	},
		
	getRecordExistsHomeTenantFormGridPaging: function() {

		return this.recordExist;

	},
	
	getPhpFile: function() {
		
		return this.phpFileGridGetPost;	
		
	},
	
	getBillsUpdateQueryName: function() {

		return this.billsUpdateQueryName;

	},

	getBillsInsertQueryName: function() {

		return this.billsInsertQueryName;

	},
	
	/**
	 * Setting values in this object constructor from the html inputs for inserting or updating
	 * @function
	 * @name BillsForm#setFieldValuesFromInputs
	 * 
	 * @param {Array} inputValueArray array of html input values
	 * @param {string} primaryKey primary key of the record we are updating
	 **/
     setFieldValuesFromInputs: function(inputValueArray, primaryKey) {
		
		this.BillsId = primaryKey;
		
		this.BillingDate = inputValueArray["billingDate"];
		this.DueDate = inputValueArray["dueDate"];
		this.BillingNumber = inputValueArray["billingNumber"];	
		this.AmountDue = inputValueArray["amountDue"];
		this.PaidDate = inputValueArray["paidDate"];
        this.PaymentMethod = inputValueArray["paymentMethod"];
        this.AmountPaid = inputValueArray["amountPaid"];
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for updating
	 * @function
	 * @name BillsForm#fieldsValuesUpdate
	 * 
	 * @returns {Array} array of the field values of this object
	 **/
	fieldsValuesUpdate: function() {
		
		var fieldsValuesUpdateArray = [];
		
		fieldsValuesUpdateArray[0] = this.BillsId;
		fieldsValuesUpdateArray[1] = this.BillingDate;
		fieldsValuesUpdateArray[2] = this.DueDate;
		fieldsValuesUpdateArray[3] = this.BillingNumber;		
		fieldsValuesUpdateArray[4] = this.AmountDue;
        fieldsValuesUpdateArray[5] = this.PaidDate;
		fieldsValuesUpdateArray[6] = this.PaymentMethod;
        fieldsValuesUpdateArray[7] = this.AmountPaid;
		
		return fieldsValuesUpdateArray;
		
	},
	
	/**
	 * Returns an array with values that have been preset in this object for inserting
	 * @function
	 * @name BillsForm#fieldsValuesInsert
	 * 
	 * @returns {Array} array of the field values of this object
	 **/
	fieldsValuesInsert: function() {
		
		var fieldsValuesInsertArray = [];
		
		fieldsValuesInsertArray[1] = this.BillingDate;
		fieldsValuesInsertArray[2] = this.DueDate;		
		fieldsValuesInsertArray[3] = this.BillingNumber;
		fieldsValuesInsertArray[4] = this.AmountDue;
        fieldsValuesInsertArray[5] = this.PaidDate;
        fieldsValuesInsertArray[6] = this.PaymentMethod;
        fieldsValuesInsertArray[7] = this.AmountPaid;
		
		return fieldsValuesInsertArray;
		
	},
		
	/**
	 * Bills form grid paging update
	 * @function
	 * @name BillsForm#billsFormGridUpdate
	 **/
	billsFormGridUpdate: function() {

		var htmlObjectFieldsValuesUpdate = this.fieldsValuesUpdate();				
														
		var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
			
		var billsFormGridPaging = new BillingTracker.BillsFormGridPaging();

		grid_get_post_functions.post_updateForm(this.getPhpFile(), this.getBillsUpdateQueryName(), document.getElementById("billsPrimaryKey").value, htmlObjectFieldsValuesUpdate, this.getFieldsInfo(), this.arrayOldValuesTable, '', billsFormGridPaging.getTableHtmlObjectId());
		
	},
	
	/**
	 * Bills form grid paging insert
	 * @function
	 * @name BillsForm#billsFormGridInsert
	 **/	
	billsFormGridInsert: function() {
	
		var htmlObjectFieldsValuesInsert = this.fieldsValuesInsert();
		
		var grid_get_post_functions = new BillingTracker.Grid_Get_Post_Functions();
			
		var billsFormGridPaging = new BillingTracker.BillsFormGridPaging();

		grid_get_post_functions.post_insertRecordForm(this.getPhpFile(), this.getBillsInsertQueryName(), htmlObjectFieldsValuesInsert, this.getFieldsInfo(), "billsPrimaryKey", this.arrayOldValuesTable, '', billsFormGridPaging.getTableHtmlObjectId());
	}
}