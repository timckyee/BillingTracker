/*
 * The BillingTracker object
 */
var BillingTracker = BillingTracker || {};

/**
 * Class for storing settings
 * @class
 **/
 BillingTracker.Config = function() {
    
    this.serverUrl = "https://bms.closedarea.com/BillingTracker";
    //this.serverUrl = "http://localhost:8888/billingtracker";

};

BillingTracker.Config.prototype = {

    getServerUrl: function() {

        return this.serverUrl;

    }

}