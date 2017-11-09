<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
        echo 'failed';
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $accountID = urldecode($data->accountID);
        $sql = "SELECT orders.orderId, orders.productID, products.productName, orderDate, orderStatus, quantity, SUM(products.price * quantity) AS TotalPrice FROM orders INNER JOIN products ON orders.productID=products.productID WHERE orders.accountID='$accountID' GROUP BY orders.orderID, products.productID";


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