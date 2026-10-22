<?php
include 'conexao.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

// Permite obter id do usuário via sessão ou POST
$id_user = isset($_SESSION['id_user']) ? $_SESSION['id_user'] : (isset($_POST['id_user']) ? intval($_POST['id_user']) : 1);
$id_pacote = isset($_POST['id_pacote']) ? intval($_POST['id_pacote']) : 0;
$dt_partida = isset($_POST['dt_partida']) ? $_POST['dt_partida'] : '';
$dt_retorno = isset($_POST['dt_retorno']) ? $_POST['dt_retorno'] : '';
$nr_pessoas = isset($_POST['nr_pessoas']) ? intval($_POST['nr_pessoas']) : 1;
$vl_total = isset($_POST['vl_total']) ? floatval($_POST['vl_total']) : 0.00;
$ds_observacao = isset($_POST['ds_observacao']) ? trim($_POST['ds_observacao']) : '';

if (!$id_pacote || empty($dt_partida) || empty($dt_retorno)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados incompletos para efetuar a reserva.']);
    exit;
}

// Se o valor não veio calculado, busca o preço do pacote
if ($vl_total <= 0) {
    $stmt_pacote = $conecta->prepare("SELECT vl_preco FROM tb_pacote WHERE id_pacote = ?");
    $stmt_pacote->bind_param("i", $id_pacote);
    $stmt_pacote->execute();
    $res_p = $stmt_pacote->get_result();
    if ($res_p->num_rows > 0) {
        $p = $res_p->fetch_assoc();
        $vl_total = $p['vl_preco'] * $nr_pessoas;
    }
    $stmt_pacote->close();
}

// Inserir agendamento
$stmt = $conecta->prepare("INSERT INTO tb_agendamento (id_user, id_pacote, dt_partida, dt_retorno, nr_pessoas, vl_total, nm_status, ds_observacao) VALUES (?, ?, ?, ?, ?, ?, 'Confirmado', ?)");
$stmt->bind_param("iissids", $id_user, $id_pacote, $dt_partida, $dt_retorno, $nr_pessoas, $vl_total, $ds_observacao);

if ($stmt->execute()) {
    $id_agendamento = $stmt->insert_id;
    
    // Pontos ganhos: 1 ponto para cada real gasto
    $pontos_ganhos = floor($vl_total);
    
    // Atualizar pontos do usuário
    $stmt_up = $conecta->prepare("UPDATE tb_user SET nr_pontos = nr_pontos + ? WHERE id_user = ?");
    $stmt_up->bind_param("ii", $pontos_ganhos, $id_user);
    $stmt_up->execute();
    $stmt_up->close();

    // Inserir no extrato de pontuação
    $desc_pontos = "Pontos pela reserva #" . $id_agendamento;
    $stmt_pts = $conecta->prepare("INSERT INTO tb_pontuacao (id_user, nr_pontos, nm_tipo, ds_descricao) VALUES (?, ?, 'credito', ?)");
    $stmt_pts->bind_param("iis", $id_user, $pontos_ganhos, $desc_pontos);
    $stmt_pts->execute();
    $stmt_pts->close();

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Reserva confirmada com sucesso!',
        'id_agendamento' => $id_agendamento,
        'pontos_ganhos' => $pontos_ganhos,
        'vl_total' => $vl_total
    ]);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao salvar reserva no banco de dados.']);
}

$stmt->close();
$conecta->close();
?>
