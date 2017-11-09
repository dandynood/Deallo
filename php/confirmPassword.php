<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
        echo 'failed';
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $accountID = urldecode($data->accountID);
        $password = urldecode($data->password);
        $sql = "SELECT username FROM useraccounts WHERE accountID = '$accountID' AND password = '$password'";


        $result = $conn->query($sql);

        if($result->num_rows > 0){
            echo 'success';
        }
        else
        {
            echo 'failed';
        }

    $conn->close();
?>