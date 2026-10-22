<?php
include 'conexao.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

$id_user = isset($_SESSION['id_user']) ? $_SESSION['id_user'] : (isset($_POST['id_user']) ? intval($_POST['id_user']) : 1);
$id_agendamento = isset($_POST['id_agendamento']) ? intval($_POST['id_agendamento']) : 0;

if (!$id_agendamento) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Identificador de reserva inválido.']);
    exit;
}

$stmt = $conecta->prepare("UPDATE tb_agendamento SET nm_status = 'Cancelado' WHERE id_agendamento = ? AND id_user = ?");
$stmt->bind_param("ii", $id_agendamento, $id_user);

if ($stmt->execute()) {
    echo json_encode(['sucesso' => true, 'mensagem' => 'Agendamento cancelado com sucesso.']);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao cancelar o agendamento.']);
}

$stmt->close();
$conecta->close();
?>
