<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: " . $conn->connect_error;
        
    }         
        $data = json_decode(file_get_contents("php://input"));
        $productID = urldecode($data->productID);
        $productName = urldecode($data->productName);
        $price = urldecode($data->price);
        $shippingPrice = urldecode($data->shippingPrice);
        $discount = urldecode($data->discount);
        $stock = urldecode($data->stock);

        $categoryID = urldecode($data->categoryID);
        $description = urldecode($data->description);
        $extraDetails = urldecode($data->extraDetails);
            
        $sql = "UPDATE userAccounts SET productName='$productName',price='$price',shippingPrice='$shippingPrice',discount='$discount',stock='$stock',categoryID='$categoryID',description='$description',extraDetails='$extraDetails' WHERE accountID='$accountID'";


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