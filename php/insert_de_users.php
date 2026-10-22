<?php
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nm_user = isset($_POST['nome']) ? trim($_POST['nome']) : '';
    $nm_email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $nr_senha = isset($_POST['password']) ? trim($_POST['password']) : '';
    $nr_telefone = isset($_POST['telefone']) ? trim($_POST['telefone']) : null;

    if (empty($nm_user) || empty($nm_email) || empty($nr_senha)) {
        echo "<script>alert('Por favor, preencha todos os campos obrigatórios.'); window.history.back();</script>";
        exit;
    }

    // Verifica se e-mail já existe
    $check = $conecta->prepare("SELECT id_user FROM tb_user WHERE nm_email = ?");
    $check->bind_param("s", $nm_email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "<script>alert('Este e-mail já está cadastrado em nossa plataforma.'); window.history.back();</script>";
        $check->close();
        exit;
    }
    $check->close();

    // Insere novo usuário com 500 pontos de boas-vindas
    $pontos_iniciais = 500;
    $stmt = $conecta->prepare("INSERT INTO tb_user (nm_user, nm_email, nr_senha, nr_telefone, nr_pontos) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $nm_user, $nm_email, $nr_senha, $nr_telefone, $pontos_iniciais);
    
    if ($stmt->execute()) {
        $id_novo_user = $stmt->insert_id;
        
        // Registra histórico de pontuação de boas-vindas
        $desc = "Bônus de boas-vindas ao se cadastrar";
        $stmt_pontos = $conecta->prepare("INSERT INTO tb_pontuacao (id_user, nr_pontos, nm_tipo, ds_descricao) VALUES (?, ?, 'credito', ?)");
        $stmt_pontos->bind_param("iis", $id_novo_user, $pontos_iniciais, $desc);
        $stmt_pontos->execute();
        $stmt_pontos->close();

        // Inicia sessão automaticamente
        session_start();
        $_SESSION['id_user'] = $id_novo_user;
        $_SESSION['nm_user'] = $nm_user;
        $_SESSION['nm_email'] = $nm_email;

        echo "<script>alert('Cadastro realizado com sucesso! Você ganhou 500 pontos de boas-vindas.'); window.location.href = '../html/usuario.html';</script>";
    } else {
        echo "<script>alert('Erro ao realizar cadastro. Tente novamente.'); window.history.back();</script>";
    }

    $stmt->close();
}
$conecta->close();
?>