<?php


$senha = $_POST['password'];
$email = $_POST['email'];


include 'conexao.php';

$select = "SELECT * FROM tb_user 
           WHERE nm_email = '$email' 
           AND nr_senha = '$senha'";

$query = $conecta->query($select);

$resultado = $query->fetch_assoc();

$email_banco = $resultado['nm_email'];
$senha_banco = $resultado['nr_senha'];


if ($email == $email_banco && $senha == $senha_banco) {
   session_start();
   $_SESSION['id_user'] = $resultado['id_user'];
   echo "<script>alert('Login feito com sucesso'); window.location.href = '../html/index.html'; </script>";
    header('location: ../html/index.html');

}
else{

     echo "<script>alert('Email ou senha incorreta'); window.location.href = '../html/login.html'; </script>";
}
?>