<?php
// header.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?? "My Website"; ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;}
        body {background:linear-gradient(135deg,#6a11cb 0%,#2575fc 100%); min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px;}
        .container {background-color:white; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.2); width:100%; max-width:450px; overflow:hidden;}
        .header {background:#4a00e0; color:white; padding:25px; text-align:center;}
        .header h1 {font-size:24px; margin-bottom:5px;}
        .header p {font-size:14px; opacity:0.9;}
        .form-container {padding:25px;}
        .input-group {margin-bottom:20px;}
        .input-group label {display:block; margin-bottom:8px; font-weight:600; color:#333;}
        .input-group input {width:100%; padding:12px 15px; border:1px solid #ddd; border-radius:6px; font-size:16px; transition:border-color 0.3s;}
        .input-group input:focus {border-color:#4a00e0; outline:none;}
        .btn {background:#4a00e0; color:white; border:none; padding:12px; width:100%; border-radius:6px; font-size:16px; font-weight:600; cursor:pointer; transition:background 0.3s;}
        .btn:hover {background:#3a00b0;}
        .result-container {display:none; text-align:center; padding:25px;}
        .profile-pic {width:200px; height:200px; border-radius:50%; object-fit:cover; border:5px solid #f0f0f0; margin:0 auto 20px; box-shadow:0 5px 15px rgba(0,0,0,0.1);}
        .download-btn {background:#00c853; display:inline-block; margin-top:15px; padding:10px 20px; color:white; text-decoration:none; border-radius:6px; font-weight:600; transition:background 0.3s;}
        .download-btn:hover {background:#009624;}
        .error-message {color:#d32f2f; text-align:center; margin-top:15px; font-weight:500; display:none;}
        .back-btn {background:none; border:none; color:#4a00e0; cursor:pointer; font-weight:600; margin-top:15px;}
        .logo {text-align:center; margin-bottom:15px;}
        .logo i {font-size:42px; color:#4a00e0;}
        .success-message {color:#2e7d32; text-align:center; margin-top:15px; font-weight:500; display:none;}
        .info-box {background-color:#e3f2fd; border-left:4px solid #2196f3; padding:15px; margin:20px 0; border-radius:4px;}
        .info-box p {margin:5px 0; color:#0d47a1; font-size:14px;}
    </style>
</head>
<body>
