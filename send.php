<?php
//  Автор скрипта- обработчика форм: http://freelanstest.ru/ - копирование лендингов, емайл: repair333@yandex.ru , телега: https://t.me/copylend


header('Content-Type: text/html; charset=utf-8');
$from = 'zakaz@'.$_SERVER['HTTP_HOST'];

$to ='ttk-family@yandex.ru'; // нужно свой майл вписать.



$Subject='Заявка с сайта '.$_SERVER['HTTP_HOST']; // тема приходящего письма

$msg='';




function mb_wordwrap($str, $width = 75, $break = "\r\n", $cut = false) {
    $lines = explode($break, $str);
    foreach ($lines as &$line) {
        $line = rtrim($line);
        if (mb_strlen($line) <= $width)
            continue;
        $words = explode(' ', $line);
        $line = '';
        $actual = '';
        foreach ($words as $word) {
            if (mb_strlen($actual.$word) <= $width)
                $actual .= $word.' ';
            else {
                if ($actual != '')
                    $line .= rtrim($actual).$break;
                $actual = $word;
                if ($cut) {
                    while (mb_strlen($actual) > $width) {
                        $line .= mb_substr($actual, 0, $width).$break;
                        $actual = mb_substr($actual, $width);
                    }
                }
                $actual .= ' ';
            }
        }
        $line .= trim($actual);
    }
    return implode($break, $lines);
}


if (isset($_POST) && (count($_POST)>0) ) 
{
if (!empty($_POST['name'])) $msg.='Имя: '.htmlspecialchars($_POST['name']).'<br>'."\n";
if (!empty($_POST['phone'])) $msg.='Телефон: '.htmlspecialchars($_POST['phone']).'<br>'."\n";

$header  = "Content-type: text/html; charset=utf-8\r\n";
$header .= "From: {$from}" . "\r\n";  
$header .= 'X-Mailer: PHP v'.phpversion()."\r\n";

$message = mb_wordwrap($msg, 70, "\r\n");

$Subject = "=?UTF-8?B?".base64_encode($Subject)."?=";
if (mail($to, $Subject, $message, "$header","-f$from")) {
} else {echo 'mail() error!'; die;}

}?>


<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
  <title>Заявка принята</title>
  <style>
    html {
      box-sizing: border-box;
      line-height: 1;
      font-family: "Segoe UI", Arial, Helvetica, sans-serif;
      scroll-behavior: smooth;
      font-size: 16px;
    }

    @media all and (max-width: 38rem) {
      html {
        font-size: 14px;
      }
    }

    *, *:before, *:after {
      box-sizing: inherit;
      font-family: inherit;
    }

    body {
      margin: 0;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      color: rgba(0, 0, 0, .7);
      background-color: #eef1f3;
    }

    .button {
      display: inline-block;
      background: transparent linear-gradient(to bottom, #FFA500 0%, #B68D42 100%) repeat scroll 0 0;
      border: none;
      box-shadow: 0 2px 1px 0 #FFFF00;
      outline: none;
      padding: .75rem 1.5rem;
      text-transform: uppercase;
      color: #fff;
      font-weight: bold;
      font-family: inherit;
      font-size: .75rem;
      border-radius: .25rem;
      cursor: pointer;
      box-sizing: border-box;
      text-decoration: none;
    }

    .button:active {
      transform: translateY(1px);
      box-shadow: 0 1px 1px 0 #FFFF00;
    }

    .thankyou {
      text-align: center;
      width: 100%;
      padding: 2rem 1rem;
      min-height: 100vh;
    }

    .thankyou h1 {
      font-weight: 500;
      font-size: 2.5rem;
      color: #FF7E00;
      margin: 0 0 2rem;
    }

    .thankyou img {
      max-width: 100%;
      margin: 1rem 0;
    }

    .thankyou .button {
      margin-top: 1rem;
    }
  </style>
</head>
<body>

<div class="thankyou">
  <h1>Спасибо, заявка принята!</h1>
  <p>Оператор свяжется с вами в ближайшее время.</p>
  <p>Если вы допустили ошибку, вернитесь на страницу заказа и оставьте заявку еще раз.</p>
  <a href="/" class="button">На главную сайта</a>
</div>
</body> </html>





