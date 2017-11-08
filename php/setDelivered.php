<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: " . $conn->connect_error;
        
    }         
        $data = json_decode(file_get_contents("php://input"));
        $productId = urldecode($data->productId);
        $orderId = urldecode($data->orderId);
        $status = urldecode($data->status);

        $sql = "UPDATE orders SET orderStatus='$status' WHERE productId='$productId' AND orderId='$orderId'";

        $result = $conn->query($sql);

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