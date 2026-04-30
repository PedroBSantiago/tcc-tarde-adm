<?php


$senha = $_POST['password'];
$email = $_POST['email'];


include 'conexao.php';

$select = "SELECT * FROM tb_user WHERE nm_email = '$email'";

$query = $conecta->query($select);

$resultado = $query->fetch_assoc();

$email_banco = $resultado['nm_email'];
$senha_banco = $resultado['cd_password'];


if ($email == $email_banco && $senha == $senha_banco) {
   session_start();
   $_SESSION['id_user'] = $resultado['id_user'];
    header('location: listar_users.php');

}
else{

     echo "<script>alert('Email ou senha incorreta'); window.location.href = 'login.html'; </script>";
}
?>