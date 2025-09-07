<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Update soon</title>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'>
  <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Arvo'>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap"
    rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
  <style>
    /*======================
    Update page styling
    =======================*/
    body,
    html {
      height: 100%;
      margin: 0;
      overflow: hidden; /* Prevent scroll */
      font-family: 'Arvo', serif;
    }

    .page_404 {
      height: 100vh; /* Full viewport */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff;
      text-align: center;
      padding: 20px;
    }

    .update h1 {
      font-size: 55px; /* Slightly smaller */
      font-weight: bold;
      margin-bottom: 20px;
    }

    .four_zero_four_bg {
      background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
      width: 100%;
      max-width: 700px; /* Larger width */
      height: 450px;    /* Larger height */
      background-position: center;
      background-size: cover;
      margin: 0 auto 20px auto;
      border-radius: 12px;
    }

    .contant_box_404 h3 {
      font-size: 22px; /* Smaller text */
      font-weight: 500;
      margin: 8px 0;
    }

    /* Bigger button styling */
    .glow-button {
      font-size: 20px;
      padding: 16px 36px;
      border-radius: 9999px;
      transition: all 0.3s ease-in-out;
    }

    .glow-button:hover {
      transform: scale(1.05);
    }
  </style>
</head>

<body>
  <section class="page_404">
    <div class="update">
      <h1>UPDATE SOON</h1>
    </div>

    <div class="four_zero_four_bg"></div>

    <div class="contant_box_404">
      <h3 class="h2">The page you are looking for is not available!</h3>
      <h3>We will update it soon</h3>
    </div>

    <div class="mt-6 d-flex justify-center">
      <button onclick="goBack()"
        class="glow-button flex items-center gap-2 bg-[#874C1B] hover:bg-[#6e3d15] text-white font-bold">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Go Back
      </button>
    </div>
  </section>

  <script>
    // Function to go back to the previous page in history
    function goBack() {
      window.history.back();
    }
  </script>
</body>

</html>
