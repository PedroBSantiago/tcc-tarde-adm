<?php
include 'conexao.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

$id_user = isset($_SESSION['id_user']) ? $_SESSION['id_user'] : (isset($_POST['id_user']) ? intval($_POST['id_user']) : 1);
$pontos_necessarios = isset($_POST['pontos']) ? intval($_POST['pontos']) : 0;
$recompensa = isset($_POST['recompensa']) ? trim($_POST['recompensa']) : '';

if (!$id_user || $pontos_necessarios <= 0 || empty($recompensa)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados de resgate inválidos.']);
    exit;
}

// Verifica saldo
$res = $conecta->query("SELECT nr_pontos FROM tb_user WHERE id_user = $id_user");
if ($res && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    $saldo_atual = intval($row['nr_pontos']);

    if ($saldo_atual < $pontos_necessarios) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Saldo insuficiente de pontos para este resgate.']);
        exit;
    }

    $novo_saldo = $saldo_atual - $pontos_necessarios;
    $conecta->query("UPDATE tb_user SET nr_pontos = $novo_saldo WHERE id_user = $id_user");
    
    $desc = "Resgate de Recompensa: " . $recompensa;
    $stmt_pts = $conecta->prepare("INSERT INTO tb_pontuacao (id_user, nr_pontos, nm_tipo, ds_descricao) VALUES (?, ?, 'debito', ?)");
    $stmt_pts->bind_param("iis", $id_user, $pontos_necessarios, $desc);
    $stmt_pts->execute();
    $stmt_pts->close();

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Recompensa resgatada com sucesso! Um voucher foi gerado para sua conta.',
        'novo_saldo' => $novo_saldo
    ]);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Usuário não encontrado.']);
}

$conecta->close();
?>
