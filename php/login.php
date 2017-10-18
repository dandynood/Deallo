<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $username = $data->username;
        $password = $data->password;
        $sql = "SELECT Name FROM userAccounts WHERE username = '$username' AND password = '$password'";


        $result = $conn->query($sql);

        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                echo $row['Name'];
            }
        }
        else
        {
            echo 'failed';
        }

    $conn->close();
?>