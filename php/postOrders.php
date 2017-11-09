<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: ".$conn->connect_error;   
    }         
        $data = json_decode(file_get_contents("php://input"));
        $accountID = $data->accountID;
        $cart = $data->cart;
        $affected = 0;
    
        foreach($cart as $item){
            $productID = $item->productID;
            $quantity = $item->quantity;
            $discount = $item->discount;
            $sales = $item->quantity * $item->price;
            
            $sql = "INSERT INTO orders (accountID,productID,orderDate,quantity,discount,sales) VALUES
            ('$accountID','$productID',CURRENT_TIMESTAMP,'$quantity','$discount','$sales')";
            
            $result = $conn->query($sql);
            $affected = $affected + $conn->affected_rows; 
            
        }

        if($affected > 0)
        {
            echo 'success';
        }
        else
        {
            echo 'failed';
        }

    $conn->close();
?>