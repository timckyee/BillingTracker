/**
 * Class for BillsGrid object
 * @class
 **/
 BillingTracker.BillsFormGridPaging = function() {
	
	this.gridName = "BillsFormGridPaging";
	this.gridGetPostDivElement = "gridBillsFormGridPaging";
	this.tableHtmlObjectId = "tableBillsFormGridPaging";
			
	this.columns = [
		
		{ colName: "Bills Id", id: "BillsId", colType: "int", hidden: "true" },
		{ colName: "Billing Date", id: "BillingDate", colType: "date" },
		{ colName: "Due Date", id: "DueDate", colType: "date" },
		{ colName: "Billing Number", id: "BillingNumber", colType: "string" },
		{ colName: "Amount Due", id: "AmountDue", colType: "float" },
		{ colName: "Paid Date", id: "PaidDate", colType: "date" },
        { colName: "Payment Method", id: "PaymentMethod", colType: "string" },
        { colName: "Amount Paid", id: "AmountPaid", colType: "float" },
		
	];
		
	var handler = new BillingTracker.Handler();
	
	this.gridIdField = "BillsId";

	this.pageSize = "4";

	this.rowOnClick =  handler.BillFormGridPagingOnClickHandler;
	
	this.phpFileGridGetPost = "php/grid_get_post.php";

	this.refreshBillsGridQueryName = "griduserbills";

	this.refreshBillsGridQueryNameSearch = "griduserbillsSearch";

	this.pageNumbersQueryName = "griduserbillsPages";

	//this.divPagingFooter = "gridGetPostBillsFormGridPagingFooter";

	this.billsGridPagingDiv = "gridGetPostBillsFormGridPagingFooter";
};

BillingTracker.BillsFormGridPaging.prototype = {
	
	/**
	 * Search value of this grid
	 * @var {Array} searchValue
	 **/
	searchValue: [],

	getGridName: function() {
		
		return this.gridName;
		
	},
	
	getRowOnClick: function() {
		
		return this.rowOnClick;
		
	},
	
	getGridIdField: function() {

		return this.gridIdField;
	},
	
	getPhpFile: function() {
		
		return this.phpFileGridGetPost;	
		
	},	
	
	getGridGetPostDivElement: function() {
		
		return this.gridGetPostDivElement;
		
	},
	
	getPageSize: function() {

		return this.pageSize;

	},

	getGridColumnsInfo: function() {
		
		return this.columns;
	},
	
	getRefreshBillsGridQueryName: function () {

		
		return this.refreshBillsGridQueryName;

	},
	
	getRefreshBillsGridQueryNameSearch: function() {

		return this.refreshBillsGridQueryNameSearch;

	},

	getPageNumbersQueryName: function() {

		return this.pageNumbersQueryName;

	},

	getDivPagingFooter: function() {

		return this.divPagingFooter;
		
	},

	getBillsGridPagingDiv: function () {

		return this.billsGridPagingDiv;

	},

	setSearchValue: function(newSearchValue) {

		this.searchValue[0] = newSearchValue;

	},

	getSearchValue: function() {

		return this.searchValue[0];

	},

	getTableHtmlObjectId: function() {
		
		return this.tableHtmlObjectId;
	}
	
};