<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        echo "Connection failed: " . $conn->connect_error;
        
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $productID = urldecode($data->productID);
        $accountID = urldecode($data->accountID);
        $rating = urldecode($data->rating);
        $title = urldecode($data->title);
        $comment = urldecode($data->comment);
            
        $sql = "INSERT INTO productRatings
        (productID,accountID,rating,title,comment,datePosted) VALUES ('$productID','$accountID','$rating','$title','$comment',current_date())";


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