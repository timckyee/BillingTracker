<?php

    $user = 'root';
    $password = 'root';
    $db = 'BillingTracker';
    $host = 'localhost';
    $port = 8889;

    $mysqli = new mysqli($host, $user, $password, $db, $port);

    if($mysqli->connect_error) {
        echo "connection error";
    }

    $myArray = array();
    $result;

	if($_SERVER["REQUEST_METHOD"] == "GET") {
		
		$queryName = $_GET["queryName"];

        if($queryName == "paymentMethods") {

            $result = $mysqli->query("SELECT PaymentMethodId, PaymentMethod from PaymentMethod");
        }
		else		
        if($queryName == "billingAccounts") {

            $result = $mysqli->query("SELECT BillingAccountId, AccountName from BillingAccount order by AccountName");
        }
        else if($queryName == "billingAccountLoad")
        {
            $billingAccountId = $_GET["billingAccountId"];

            $result = $mysqli->query("SELECT BillingAccountId, AccountName, AccountNumber, AccountUserName from BillingAccount where BillingAccountId = " . $billingAccountId);
        }
        else if($queryName == "griduserbills") {
			
			$sortColumn = $_GET["sortColumn"];
			$sortDirection = $_GET["sortDirection"];

			$orderBy;

			if($sortColumn == "BillsId")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY BillsId asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY BillsId desc";
				}
			}
			else if($sortColumn == "DueDate")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY DueDate asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY DueDate desc";
				}
			}
			else if($sortColumn == "BillingNumber")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY BillingNumber asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY BillingNumber desc";
				}					
			}
			else if($sortColumn == "AmountDue")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY AmountDue asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY AmountDue desc";
				}
			}
			else if($sortColumn == "PaidDate")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY PaidDate asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY PaidDate desc";
				}
			}
			else if($sortColumn == "PaymentMethod")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) desc";
				}
			}
			else if($sortColumn == "AmountPaid")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY AmountPaid asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY AmountPaid desc";
				}
			}

			if($_GET["savePrimaryKey"] != "")
			{
				$savePrimaryKey = $_GET["savePrimaryKey"];
				
				$fieldPrimaryKeySortSecondColumnDirection;
				if($sortDirection == "asc")
				{
					$fieldPrimaryKeySortSecondColumnDirection = "asc";
				}
				else if($sortDirection == "desc")
				{
					$fieldPrimaryKeySortSecondColumnDirection = "desc";
				}

				$mysqli->query('SET @row_number = 0;');
				$sql = "SELECT num, BillsId
					FROM
					(
					SELECT (@row_number:=@row_number + 1) AS num, 
					BillsId, 
					DueDate,
					BillingNumber,
					AmountDue,
                    PaidDate,
                    (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) as PaymentMethod,
                    AmountPaid
				FROM
					BillingAccountUserBills WHERE BillingAccountId=" . $_GET["billingAccountId"] . " " . $orderBy . ", BillsId " . $fieldPrimaryKeySortSecondColumnDirection .
					") subqueryAddRowNumber
				WHERE BillsId = " . $savePrimaryKey;

				$stmt = $mysqli->prepare($sql);
				$stmt->execute();

				$result = $stmt->get_result();

				$row = $result->fetch_object();

				$rowNumber = $row->num;
						
				$pageSize = $_GET["pageSize"];
				$pageNumber;

				if($rowNumber % $pageSize > 0)
				{
					$pageNumber = floor($rowNumber / $pageSize) + 1;
				}
				else if($rowNumber % $pageSize == 0)
				{
					$pageNumber = floor($rowNumber / $pageSize);
				}
					
				$limit = $pageSize;
				$offset = ($pageNumber - 1) * $pageSize;

				if($_GET["queryType"] == "getPageNumber")
				{
					echo $pageNumber;
					return;
				}
			}
			else
			{
				$primaryKeySortDirection = '';

				$pageNumber = $_GET["pageNumber"];

				$pageSize = $_GET["pageSize"];

				$limit = $pageSize;
				$offset = ($pageNumber - 1) * $pageSize;

				if($sortDirection == "asc")
				{
					$primaryKeySortDirection = "asc";
				}
				else if($sortDirection == "desc")
				{
					$primaryKeySortDirection = "desc";
				}

				$result = $mysqli->query("SELECT BillsId, DueDate, BillingNumber, AmountDue, PaidDate, (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) as PaymentMethod, AmountPaid from BillingAccountUserBills where BillingAccountId=" . $_GET["billingAccountId"] . " " . $orderBy . ", BillsId " . $primaryKeySortDirection . " limit " . $limit . " offset " . $offset);
			}
		}      
		else if($queryName == "griduserbillsSearch")
		{			
			$sortColumn = $_GET["sortColumn"];
			$sortDirection = $_GET["sortDirection"];

			$orderBy;

			if($sortColumn == "BillsId")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY BillsId asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY BillsId desc";
				}
			}
			else if($sortColumn == "DueDate")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY DueDate asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY DueDate desc";
				}
			}
			else if($sortColumn == "BillingNumber")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY BillingNumber asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY BillingNumber desc";
				}					
			}
			else if($sortColumn == "AmountDue")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY AmountDue asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY AmountDue desc";
				}
			}
			else if($sortColumn == "PaidDate")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY PaidDate asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY PaidDate desc";
				}
			}
			else if($sortColumn == "PaymentMethod")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) desc";
				}
			}
			else if($sortColumn == "AmountPaid")
			{
				if($sortDirection == "asc")
				{
					$orderBy = "ORDER BY AmountPaid asc";
				}
				else if($sortDirection == "desc")
				{
					$orderBy = "ORDER BY AmountPaid desc";
				}
			}

			$billingAccountId = $_GET["billingAccountId"];
			$searchValue = $_GET["searchValue"];

			if($_GET["savePrimaryKey"] != "")
			{
				$savePrimaryKey = $_GET["savePrimaryKey"];			

				$fieldPrimaryKeySortSecondColumnDirection;
				if($sortDirection == "asc")
				{
					$fieldPrimaryKeySortSecondColumnDirection = "asc";
				}
				else if($sortDirection == "desc")
				{
					$fieldPrimaryKeySortSecondColumnDirection = "desc";
				}

				$mysqli->query('SET @row_number = 0;');
				$mysqli->query('SET @searchValue = \'' . $searchValue . '\';');
				$sql = "SELECT num, BillsId
					FROM
					(
					SELECT (@row_number:=@row_number + 1) AS num, 
					BillsId,
                    DueDate,
                    BillingNumber,
                    AmountDue,
                    PaidDate,
                    (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) as PaymentMethod,
                    AmountPaid
				FROM
					BillingAccountUserBills
				WHERE
					BillingAccountId=" . $_GET["billingAccountId"] . " and " . 

					"(date_format(DueDate, '%d-%b-%Y') like concat('%', @searchValue, '%') or

                    BillingNumber like concat('%', @searchValue, '%') or
                    AmountDue like concat('%', @searchValue, '%') or

					date_format(PaidDate, '%d-%b-%Y') like concat('%', @searchValue, '%') or
					
					(select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) like concat('%', @searchValue, '%') or

                    AmountPaid like concat('%', @searchValue, '%')) " .
                    
                    $orderBy . ", BillsId " . $fieldPrimaryKeySortSecondColumnDirection .
					") subqueryAddRowNumber
				WHERE BillsId = " . $savePrimaryKey;

				$stmt = $mysqli->prepare($sql);
				$stmt->execute();

				$result = $stmt->get_result();

				$row = $result->fetch_object();

				$rowNumber = $row->num;

				$pageSize = $_GET["pageSize"];
				$pageNumber;

				if($rowNumber % $pageSize > 0)
				{
					$pageNumber = floor($rowNumber / $pageSize) + 1;
				}
				else if($rowNumber % $pageSize == 0)
				{
					$pageNumber = floor($rowNumber / $pageSize);
				}

				$limit = $pageSize;
				$offset = ($pageNumber - 1) * $pageSize;

				if($_GET["queryType"] == "getPageNumber")
				{
					echo $pageNumber;
					return;
				}
			}
			else
			{
				$primaryKeySortDirection = '';

				$pageNumber = $_GET["pageNumber"];

				$pageSize = $_GET["pageSize"];

				$limit = $pageSize;
				$offset = ($pageNumber - 1) * $pageSize;

				if($sortDirection == "asc")
				{
					$primaryKeySortDirection = "asc";
				}
				else if($sortDirection == "desc")
				{
					$primaryKeySortDirection = "desc";
				}

				$mysqli->query('SET @searchValue = \'' . $searchValue . '\'');
				$sql = "SELECT BillsId, DueDate, BillingNumber, AmountDue, PaidDate, (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) as PaymentMethod, AmountPaid from BillingAccountUserBills where BillingAccountId = " . $billingAccountId . " and (date_format(DueDate, '%d-%b-%Y') like concat('%', @searchValue, '%') or

                BillingNumber like concat('%', @searchValue, '%') or
                AmountDue like concat('%', @searchValue, '%') or

				date_format(PaidDate, '%d-%b-%Y') like concat('%', @searchValue, '%') or
				
				(select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) like concat('%', @searchValue, '%') or
				
                AmountPaid like concat('%', @searchValue, '%')) " . $orderBy  . ", BillsId " . $primaryKeySortDirection . " limit " . $limit . " offset " . $offset;

				$stmt = $mysqli->prepare($sql);
				$stmt->execute();

				$result = $stmt->get_result();
			}

		} else if($queryName == "griduserbillsPages") {
		
			$billingAccountId = $_GET["billingAccountId"];
			$searchValue = $_GET["searchValue"];

			//echo $billingAccountId . ";" . $searchValue;
			//return;

			if($searchValue != "")
			{	
				$pageSize = $_GET["pageSize"];
				
				$mysqli->query('SET @searchValue = \'' . $searchValue . '\'');
				$sql = "SELECT count(BillsId) as gridRows from BillingAccountUserBills where

				BillingAccountId = " . $billingAccountId . " and " .

				"(date_format(DueDate, '%d-%b-%Y') like concat('%', @searchValue, '%') or

                BillingNumber like concat('%', @searchValue, '%') or
                AmountDue like concat('%', @searchValue, '%') or                
				
				date_format(PaidDate, '%d-%b-%Y') like concat('%', @searchValue, '%') or

                (select PaymentMethod from PaymentMethod where PaymentMethodId = BillingAccountUserBills.PaymentMethod) like concat('%', @searchValue, '%') or
				
                AmountPaid like concat('%', @searchValue, '%'))";

				$stmt = $mysqli->prepare($sql);
				$stmt->execute();

				$result = $stmt->get_result();

				$row = $result->fetch_object();

				$gridRows = $row->gridRows;

				$totalPagesRemainder = $gridRows % $pageSize;

				if($totalPagesRemainder >= 1)
				{
					$totalPages = floor($gridRows / $pageSize) + 1;
				}
				else
				{
					$totalPages = $gridRows / $pageSize;
				}

				echo $totalPages;
				
				return;				

			}			
			else
			{
				$pageSize = $_GET["pageSize"];

				$billingAccountId = $_GET["billingAccountId"];

				$result = $mysqli->query("select count(BillsId) as gridRows from BillingAccountUserBills where BillingAccountId=" . $billingAccountId);

				$row = $result->fetch_object();

				$gridRows = $row->gridRows;

				$totalPagesRemainder = $gridRows % $pageSize;

				if($totalPagesRemainder >= 1)
				{
					$totalPages = ceil($gridRows / $pageSize);
				}
				else
				{
					$totalPages = $gridRows / $pageSize;
				}
				
				echo $totalPages;
				
				return;
			}

		}
		else
		if($queryName == "populateBillsForm") {
			
			$result = $mysqli->query("SELECT BillsId, DueDate, BillingNumber, AmountDue, PaidDate, PaymentMethod, AmountPaid from BillingAccountUserBills where BillsId=" . $_GET["htmlObjectPrimaryKeyValue"]);
		
		}	   

	    if (!is_null($result)) {
	        $tempArray = array();
	        while($row = $result->fetch_object()) {
		    	        
	                $tempArray = $row;
	                array_push($myArray, $tempArray);
	        }
	
	        echo json_encode($myArray);
	    }
	    
	    $result->close();

    }
    else if($_SERVER["REQUEST_METHOD"] == "POST") {
	 
		if($_POST["postType"] == "updateTableBillingAccountUserBills")
	    { 
			$result = $mysqli->query("update BillingAccountUserBills set " . $_POST["updateString"] . " where " . "BillsId = " . $_POST["htmlObjectPrimaryKeyValue"]);
	    }
		else if($_POST["postType"] =="createRecordBillingAccountUserBills")
		{
			if($mysqli->query("insert into BillingAccountUserBills " . $_POST["insertString"]) === true)
			{
				$last_id = $mysqli->insert_id;
				echo $last_id;
			}
		}
		else
		if($_POST["postType"] == "createBillingAccount")
	    {
            if($mysqli->query("insert into BillingAccount " . $_POST["insertString"]) === true);
            {
                $last_id = $mysqli->insert_id;
                echo $last_id;
            }
        }
        else if($_POST["postType"] == "updateBillingAccount")
        {
            $result = $mysqli->query("update BillingAccount set " . $_POST["updateString"] . " where BillingAccountId = " . $_POST["billingAccountId"]);
        }

    }