<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: " . $conn->connect_error;
        
    }         
        $data = json_decode(file_get_contents("php://input"));
        $accountID = urldecode($data->accountID);
        $address = urldecode($data->productID);
        $email = urldecode($data->productName);
        $phoneNumber = urldecode($data->price);

            
        $sql = "UPDATE userAccounts SET address='$address',email='$email',phonenumber='$phoneNumber' WHERE accountID='$accountID'";


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