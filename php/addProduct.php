<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: " . $conn->connect_error;
        
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $productName = urldecode($data->productName);
        $price = urldecode($data->price);
        $shippingPrice = urldecode($data->shippingPrice);
        $discount = urldecode($data->discount);
        $stock = urldecode($data->stock);

        $categoryID = urldecode($data->categoryID);
        $description = urldecode($data->description);
        $extraDetails = urldecode($data->extraDetails);
        $accountID = urldecode($data->accountID);
            
        $sql = "INSERT INTO products (productName,price,shippingPrice,discount,stock,dateAdded,categoryID,description,extraDetails,accountID) VALUES ('$productName','$price','$shippingPrice','$discount','$stock',CURRENT_DATE,'$categoryID','$description','$extraDetails','$accountID')";


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