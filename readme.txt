
This Billing Tracker system was created to track over due bills.

grid - BillsFormGridPaging.js
- This is the grid object fields and settings
- features: sorting (goes to server), moving to another page using left
  and right arrows or entering a number in the page number input box
  clicking on Go, entering search term in the search box, clicking on
  Search and searching for records by on any column based on billing account
- note: after updating or inserting, the record is shown in the 
  correct sort order and is highlighted.
  if the user performed search in the search text box and clicked on search, 
  if the updated or inserted record is part of the search, then it will show
  on the correct page highlighted, if it is not part of the search 
  the page will stay the same and the record will not be shown nor highlighted
- can specify page size, shows page number total at bottom
- initial sort column: DueDate and initial sort direction: desc
- onload of page, load Billing Accounts and PaymentMethods select list

select list - Billing Account
- This is the select list at the top of the page
- choose an account in the BillingAccount selection list and bills grid shows

form - Billing Account
- This is the form at the top of the page which has fields for Billing Account
- can click on save to update if there are any changes
- can click on save to insert after clicking on New and entering values
- fields: Billing Account Id, Account Name, Account Number, Account User Name

form - BillsForm.js
- This is the form object which is used to update and insert records
- double click on grid, highlights row, and populates the form
- can click on save to update if there are any changes
- can click on save to insert after clicking on New and entering values
- Uses an old values array to detect any changes in data when updating
- has custom calendar picker (dd-mmm-yyyy)
- fields: Bills Id, Billing Date, Due Date, Amount Due,
  Bill Number, Paid Date, Payment Method, Amount Paid

controller.js
- This is the main file for updating and inserting records
- for updating and inserting billing accounts and bills

view - 4 views
- viewphone.html - optimized for phone
- notes: form fields and grid fit on the mobile screen
without having to scroll up and down
-  grid scrolls left or right

- viewdesktop.html - optimized for desktop

- viewipad.html - optimized for ipad

- notpaid.html - shows grid of unpaid bills
  shows the bill records that do not have paid date
