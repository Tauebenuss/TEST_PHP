<?php
    $uploaddir = "/var/www/ebirdy/upload/maintenances/";
    if(isset($_FILES['file']['tmp_name'])) {
        if (is_uploaded_file($_FILES['file']['tmp_name'])) {
            $uploadfile = $uploaddir . basename($_FILES['file']['name']);
            if ( move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile) ) {
                echo "ok";
            }else {
                print_r($_FILES);
            }
        } else {
            echo "ko";
        }
    }

    if(isset($_POST['value'])) {
        echo $_POST['value'];
    }
else {
echo 'not value';
}