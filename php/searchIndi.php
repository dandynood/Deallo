<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
        echo 'failed';
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $productID = $data->productID; 
        $sql = "SELECT products.*, AVG(productratings.rating) AS averageRating FROM products LEFT OUTER JOIN productratings ON products.productID = productratings.productID WHERE products.productID = '$productID'";

        $result = $conn->query($sql);

        if($result->num_rows > 0){
            $outp = array();
            $outp[] = $result->fetch_object();

            echo json_encode($outp);
        }
        else
        {
            echo 'failed';
        }

    $conn->close();
?>