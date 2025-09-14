<?php
if(isset($_POST['index_number'], $_POST['email'], $_POST['phone'], $_POST['new_password'])){
    $index_number = $_POST['index_number'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $new_password = $_POST['new_password'];

    $students = file("students.txt");
    $updated = false;

    foreach($students as &$line){
        $data = explode(",", trim($line));
        // Verify index, email, and phone
        if($data[0] == $index_number && $data[2] == $email && $data[3] == $phone){
            $data[1] = $new_password; // Update password
            $line = implode(",", $data) . "\n";
            $updated = true;
            break;
        }
    }

    if($updated){
        file_put_contents("students.txt", implode("", $students));
        echo "Password updated successfully! ";
        
        
    } else {
        echo "Invalid index number, email, or phone number.";
    }
} else {
    echo "All fields are required.";
}
?>
