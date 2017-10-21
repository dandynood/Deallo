<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: " . $conn->connect_error;
        
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $username = urldecode($data->username);
        $password = urldecode($data->password);
        $firstName = urldecode($data->firstName);
        $lastName = urldecode($data->lastName);
        $address = urldecode($data->address);
        $postcode = urldecode($data->postcode);
        $state = urldecode($data->state);
        $country = urldecode($data->country);
        $Email = urldecode($data->email);
        $phoneNumber = urldecode($data->phoneNumber);
        $accountType = urldecode($data->accountType);
            
        $sql = "INSERT INTO userAccounts
        (username, password, firstName, lastName, address, postcode, state, country, Email,phoneNumber,accountType) VALUES ('$username','$password','$firstName','$lastName','$address','$postcode','$state','$country','$Email','$phoneNumber','$accountType')";


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