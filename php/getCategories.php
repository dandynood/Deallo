<?php
    require_once 'config.php';
    $conn = new mysqli($DB_host,$DB_user,$DB_pass,$DB_name);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
        echo 'failed';
    }         

        $sql = "SELECT * FROM category";

        $result = $conn->query($sql);

        if($result->num_rows > 0){
           $outp = array();
            $outp = $result->fetch_all(MYSQLI_ASSOC);
            foreach($outp as &$v) {
                $v['categoryID'] = utf8_encode($v['categoryID']);
                $v['categoryName'] = utf8_encode($v['categoryName']);
            }

            echo json_encode($outp);
        }
        else
        {
            echo 'failed';
        }

    $conn->close();
?>