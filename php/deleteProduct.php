<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: " . $conn->connect_error;
        
    }         
        $data = json_decode(file_get_contents("php://input"));
        $productID = urldecode($data->productID);

            
        $sql = "DELETE FROM productRatings WHERE productID = '$productID';"; 
        $sql2 = "DELETE FROM orders WHERE orders.productID = '$productID';";
        $sql3 = "DELETE FROM products WHERE products.productID = '$productID'";

        $result = $conn->query($sql);
        $result2 = $conn->query($sql2);
        $result3 = $conn->query($sql3);
     
        if($conn->affected_rows > 0)
        {
            echo 'success';
        }
        else
        {
            echo 'failed';
        }

    $conn->close();
?>