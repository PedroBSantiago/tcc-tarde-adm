<?php

$nome = $_POST['name'];
$senha = $_POST['password'];
$email = $_POST['email'];


include 'conexao.php';

$insert = "INSERT INTO tb_user VALUE (NULL, '$nome', '$email', '$senha')";

$query = $conecta->query($insert);

// if ($conecta->query($insert) === TRUE) {
//   $last_id = $conecta->insert_id;
//   echo "New record created successfully. Last inserted ID is: " . $last_id;
// } else {
//   echo "Error: " . $insert . "<br>" . $conn->error;
// }

if ($query == true) {
   
    echo "<script>alert('cadastrado com sucesso'); window.location.href = 'login.html'; </script>";

}