<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
        echo 'failed';
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $accountID = urldecode($data->accountID);
        $sql = "SELECT * FROM products WHERE accountID ='$accountID'";


        $result = $conn->query($sql);

        if($result->num_rows > 0){
            $outp = array();
            $outp[] = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
        }
        else
        {
            echo 'failed';
        }

    $conn->close();
?>