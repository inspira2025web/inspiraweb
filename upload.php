<!DOCTYPE html>
<html lang="en">

<head>
 <script src="assets/js/google.js"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration</title>

  <!-- Tailwind CSS for styling -->
  <?php include 'assets/includes/css-links-inc.php'; ?>
  <link rel="stylesheet" href="assets/css/style.css">

  <style>
    .form-container {
      width: 100%;
      max-width: 900px; /* Optional: constrain form width on large screens */
      margin: auto;
      /* border: 1px solid #ddd; */
      border-radius: 8px;
      overflow: hidden; /* Ensures clean look if fallback is needed */
      background: rgba(194, 194, 194, 0.15);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
    }

    iframe {
      width: 100%;
      height: 600px; /* Fallback height */
      border: none;
      display: block;
    }
    .section-title{
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #FFA500; /* Orange color */
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
    }
    
/* Tablet devices (768px - 1024px) */
@media (max-width: 1024px) {
  .form-container {
    max-width: 100%; /* Use full width on tablets */
    padding: 0 1rem;
  }

  iframe {
    height: 1000px; /* shorter height for tablets */
  }

  .section-title {
    font-size: 2rem; /* slightly smaller heading */
  }
}

/* Mobile devices (up to 767px) */
@media (max-width: 767px) {
  .form-container {
    max-width: 100%;
    padding: 0 0.5rem; /* add side padding */
  }

  iframe {
    height: 900px; /* adjust form height */
  }

  .section-title {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
}

/* Very small screens (up to 480px) */
@media (max-width: 480px) {
  iframe {
    height: 800px; /* tighter for small screens */
  }

  .section-title {
    font-size: 1.4rem;
  }
}
</style>
</head>

<body class="animated-gradient text-white overflow-x-hidden">

  <!-- Main Content Container -->
<?php include 'assets/includes/uheader.php'; ?>
  <main class="w-full max-w-2xl mx-auto text-center flex flex-col items-center fade-in mt-3 mb-3">
<h1 class="section-title">Please fill out the Form</h1>
    <div class="form-container">
      <iframe id="googleForm"
        src="https://docs.google.com/forms/d/e/1FAIpQLSetEqRCaN_Sc2h8R3fleF4Ozd5DUfvae1Y9z6x3Ch7CmnHGpA/viewform?embedded=true"
        allowfullscreen width="640" height="560" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    </div>

  </main>
 <script>
    (function () {
      const iframe = document.getElementById("googleForm");

      function adjustIframeHeight() {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          const height = Math.max(
            doc.body.scrollHeight,
            doc.documentElement.scrollHeight
          );
          iframe.style.height = height + "px";
        } catch (err) {
          console.warn(
            "Could not auto-resize iframe due to cross-origin policies. Using fallback height."
          );
        }
      }

      iframe.addEventListener("load", adjustIframeHeight);
      window.addEventListener("resize", adjustIframeHeight);
    })();
  </script>
 <?php include 'assets/includes/footer.php'; ?>
 <?php include 'assets/includes/js-links-inc.php'; ?>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/util.js"></script>

</body>

</html>