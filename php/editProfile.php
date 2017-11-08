<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: " . $conn->connect_error;
        
    }         
        $data = json_decode(file_get_contents("php://input"));
        $accountID = urldecode($data->accountID);
        $email = urldecode($data->email);
        $phoneNumber = urldecode($data->phoneNumber);
        $address = urldecode($data->address);
        $city = urldecode($data->city);
        $postcode = urldecode($data->postcode);
        $state = urldecode($data->state);
        $country = urldecode($data->country);
            
        $sql = "UPDATE userAccounts SET address='$address',city='$city',email='$email',phonenumber='$phoneNumber',postcode='$postcode',state='$state',country='$country' WHERE accountID='$accountID'";

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