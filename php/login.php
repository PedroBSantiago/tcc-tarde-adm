<?php
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $senha = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (empty($email) || empty($senha)) {
        echo "<script>alert('Preencha seu e-mail e senha.'); window.history.back();</script>";
        exit;
    }

    $stmt = $conecta->prepare("SELECT id_user, nm_user, nm_email, nr_senha, nr_pontos FROM tb_user WHERE nm_email = ? AND nr_senha = ?");
    $stmt->bind_param("ss", $email, $senha);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $user = $resultado->fetch_assoc();
        session_start();
        $_SESSION['id_user'] = $user['id_user'];
        $_SESSION['nm_user'] = $user['nm_user'];
        $_SESSION['nm_email'] = $user['nm_email'];
        $_SESSION['nr_pontos'] = $user['nr_pontos'];

        echo "<script>
            localStorage.setItem('explorar_user', JSON.stringify({
                id: " . json_encode($user['id_user']) . ",
                nome: " . json_encode($user['nm_user']) . ",
                email: " . json_encode($user['nm_email']) . ",
                pontos: " . json_encode($user['nr_pontos']) . "
            }));
            window.location.href = '../html/usuario.html';
        </script>";
        exit;
    } else {
        echo "<script>alert('E-mail ou senha incorretos.'); window.history.back();</script>";
        exit;
    }

    $stmt->close();
}
$conecta->close();
?>