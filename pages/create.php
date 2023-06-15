<?php
session_start();
$_SESSION['username'] = "Luka.Bilbao";
$_SESSION['password'] = "luka12345678";

$fieldNames = array(
  "question",
  "question_image",
  "option_1",
  "option_2",
  "option_3",
  "option_4",
  "correct_option"
);

$data = array();
$dataFile = fopen("../assets/data.txt", "a") or die("Unable to open file!");
$dataStr = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data["id"] = uniqid();
  foreach ($fieldNames as $fieldName) {
    if ($fieldName == "correct_option") {
      $data[$fieldName] = $_POST[$fieldName];
    } elseif ($fieldName == "question_image" && isset($_FILES['question_image'])) {
      $imgName = $_FILES['question_image']['name'];
      $tmpName = $_FILES['question_image']['tmp_name'];
      $error = $_FILES['question_image']['error'];

      if ($error === 0) {
        $imgEx = strtolower(pathinfo($imgName, PATHINFO_EXTENSION));
        $newImgName = uniqid("IMG-", true) . '.' . $imgEx;
        $path = '../images/' . $newImgName;
        move_uploaded_file($tmpName, $path);
        $data[$fieldName] = $newImgName;
      } else {
        echo "<script>alert('An error occurred!');</script>";
      }
    } else {
      $data[$fieldName] = trim($_POST[$fieldName]);
    }
  }

  foreach ($data as $key => $value) {
    $dataStr .= "{$key}:{$value}";
    if ($key !== "correct_option") {
      $dataStr .= ",";
    }
  }
  $dataStr .= "\n";

  fwrite($dataFile, $dataStr);
  fclose($dataFile);
  if (!isset($_COOKIE["hasCreatedTestBefore"])) {
    setcookie("hasCreatedTestBefore", "true", time() + 86400, "/");
  }
  session_destroy();
  header("Location: ./quiz.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="shortcut icon" href="../images/logo.png" type="image/png" />
  <script defer src="../js/index.js"></script>
  <title>Create Test</title>
  <?php
  echo "<script> console.log(\"{$_SESSION['username']}\", \"{$_SESSION['password']}\") </script>";
  ?>

</head>

<body>
  <?php
  require_once('./components/header.php');
  ?>
  <main class="center">
    <form action="create.php" method="post" data-create-test-form enctype="multipart/form-data">
      <fieldset>
        <legend>create Your own test</legend>
        <label for="question">enter test question</label>
        <label for="option_1">enter first option</label>
        <label for="option_2">enter second option</label>
        <label for="option_3">enter third option</label>
        <label for="option_4">enter fourth option</label>
        <label for="input_img">optional </label>
        <label for="option1">Option 1</label>
        <label for="option2">Option 2</label>
        <label for="option3">Option 3</label>
        <label for="option4">Option 4</label>
        <input type="text" id="question" required name="question" placeholder="Enter test question" class="primary_input_field" autocomplete="off">
        <div class="option_wrapper">
          <input type="text" required id="option_1" name="option_1" placeholder="Enter first option" class="primary_input_field" autocomplete="off">
          <input type="radio" required name="correct_option" value="option_1" id="option1" checked>
        </div>
        <div class="option_wrapper">
          <input type="text" required id="option_2" name="option_2" placeholder="Enter second option" class="primary_input_field" autocomplete="off">
          <input type="radio" required name="correct_option" value="option_2" id="option2">
        </div>
        <div class="option_wrapper">
          <input type="text" required id="option_3" name="option_3" placeholder="Enter third option" class="primary_input_field" autocomplete="off">
          <input type="radio" required name="correct_option" value="option_3" id="option3">
        </div>
        <div class="option_wrapper">
          <input type="text" required id="option_4" name="option_4" placeholder="Enter fourth option" class="primary_input_field" autocomplete="off">
          <input type="radio" required name="correct_option" value="option_4" id="option4">
        </div>
        <label for="input_img" class="img_input">
          <input type="file" id="input_img" name="question_image" accept="image/png, image/jpeg, image/jpg">
        </label>
        <input type="submit" value="Submit" class="primary_button_link">
      </fieldset>
    </form>
  </main>
  <?php
  require_once("./components/footer.php");
  ?>
</body>

</html>