<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
        echo 'failed';
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $accountID = urldecode($data->accountID);

        $sql = "SELECT products.productID, products.productName,products.price,products.discount, orders.orderDate, orders.quantity, sales FROM sales INNER JOIN products ON sales.productID=products.productID INNER JOIN orders ON sales.orderID=orders.orderID WHERE products.accountID='$accountID' AND orders.orderStatus=true";


        $result = $conn->query($sql);

        if($result->num_rows > 0){
            $outp = array();
            $outp[] = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
        }
        else
        {
            echo 'failed';
        }

    $conn->close();
?>
