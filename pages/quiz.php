<?php
$dataFile = fopen('../assets/data.txt', 'r') or die("Unable to open file!");
$dataFileSize = filesize("../assets/data.txt");
if ($dataFileSize === 0) {
  header("Location: ./create.php");
}
$dataStr = explode("\n\n", fread($dataFile, $dataFileSize));
$data = array();

foreach ($dataStr as $value1) {
  $entriesStrings = explode(",", $value1);
  $questionData = array();

  foreach ($entriesStrings as $value2) {
    $entries = explode(":", $value2);
    if ($value2 !== "") {
      $questionData[$entries[0]] = $entries[1];
    }
  }
  if (empty($questionData)) {
    continue;
  }
  array_push($data, $questionData);
}
fclose($dataFile);
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
  <title>Quiz</title>
</head>

<body>
  <?php
  require_once("./components/header.php");
  ?>
  <main class="center">
    <section>
      <h2 data-score>Take the quiz!</h2>

      <ul class="inactive" data-question-balls>
        <?php
        $questionCount = count($data);
        for ($i = 0; $i < $questionCount; ++$i) {
          echo "<li data-question-ball></li>";
        }
        ?>
      </ul>
      <ul class="inactive" data-quizzes>
        <?php
        foreach ($data as $key => $question) {
          $hasImage = array_key_exists("question_image", $question);
          $imageTag = $hasImage ? "<img src=\"../images/{$question["question_image"]}\" alt=\"Image associated with question\" />" : "";
          $expandedClassAtt = $key === 0 ? "class=\"expanded\"" : "";
          $dataAttrOption1 = $question["correct_option"] === "option_1" ? "data-correct" : "";
          $dataAttrOption2 = $question["correct_option"] === "option_2" ? "data-correct" : "";
          $dataAttrOption3 = $question["correct_option"] === "option_3" ? "data-correct" : "";
          $dataAttrOption4 = $question["correct_option"] === "option_4" ? "data-correct" : "";

          echo "<li data-question {$expandedClassAtt}>
            <div class=\"test_wrapper\">
              <div class=\"question\">
                <h2>{$question["question"]}</h2>
                {$imageTag}
              </div>
              <ul>
                <li><button {$dataAttrOption1} data-option>{$question["option_1"]}</button></li>
                <li><button {$dataAttrOption2} data-option>{$question["option_2"]}</button></li>
                <li><button {$dataAttrOption3} data-option>{$question["option_3"]}</button></li>
                <li><button {$dataAttrOption4} data-option>{$question["option_4"]}</button></li>
              </ul>
            </div>
          </li>";
        }
        ?>
      </ul>
      <button class="primary_button_link inactive" data-check-btn disabled>
        check
      </button>
      <button class="primary_button_link inactive" data-next-btn>next</button>
      <button class="primary_button_link inactive" data-finish-btn>
        finish
      </button>
      <button class="primary_button_link" data-start-btn>start</button>
      <button class="primary_button_link inactive" data-try-again-btn>
        try Again
      </button>
    </section>
  </main>
  <?php
  require_once('./components/footer.php');
  ?>

</body>

</html>