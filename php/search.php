<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
        echo 'failed';
    }         
        $data = json_decode(file_get_contents("php://input")); 
        $name = urldecode($data->name);
        $category = $data->category;

        $sql = "SELECT products.*, AVG(productratings.rating) AS averageRating FROM products LEFT OUTER JOIN productratings ON products.productID = productratings.productID WHERE productName LIKE '%".$name."%' AND categoryID = '$category' GROUP BY products.productID";
        
        if($category == "All")
        {
            $sql = "SELECT products.*, AVG(productratings.rating) AS averageRating FROM products LEFT OUTER JOIN productratings ON products.productID = productratings.productID WHERE productName LIKE '%".$name."%' GROUP BY products.productID";
        } 
        
        if($name == "index")
        {
            $sql = "SELECT products.*, AVG(productratings.rating) AS averageRating FROM products LEFT OUTER JOIN productratings ON products.productID = productratings.productID WHERE categoryID = '$category' GROUP BY products.productID";
        }
        
        if($name == "index" && $category == "All"){
            $sql = "SELECT products.*, AVG(productratings.rating) AS averageRating FROM products LEFT OUTER JOIN productratings ON products.productID = productratings.productID GROUP BY products.productID";
        }

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