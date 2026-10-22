<?php
include 'conexao.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

$id_user = isset($_SESSION['id_user']) ? $_SESSION['id_user'] : (isset($_GET['id_user']) ? intval($_GET['id_user']) : 1);

$response = [
    'usuario' => null,
    'agendamentos' => [],
    'pontos' => []
];

// Dados do usuário
$res_user = $conecta->query("SELECT id_user, nm_user, nm_email, nr_telefone, dt_nascimento, nr_pontos, dt_cadastro FROM tb_user WHERE id_user = $id_user");
if ($res_user && $res_user->num_rows > 0) {
    $response['usuario'] = $res_user->fetch_assoc();
} else {
    // Mock padrão de demonstração para Brotas, São Roque e Campos do Jordão
    $response['usuario'] = [
        'id_user' => 1,
        'nm_user' => 'Viajante Explorador',
        'nm_email' => 'viajante@explorarmais.com.br',
        'nr_telefone' => '(11) 98765-4321',
        'nr_pontos' => 3850,
        'dt_cadastro' => date('Y-m-d H:i:s')
    ];
}

// Agendamentos
$sql_agend = "SELECT a.id_agendamento, a.dt_partida, a.dt_retorno, a.nr_pessoas, a.vl_total, a.nm_status, a.ds_observacao,
                     p.nm_pacote, p.nm_imagem, d.nm_destino, d.nm_cidade
              FROM tb_agendamento a
              JOIN tb_pacote p ON a.id_pacote = p.id_pacote
              JOIN tb_destino d ON p.id_destino = d.id_destino
              WHERE a.id_user = $id_user
              ORDER BY a.dt_partida DESC";

$res_agend = $conecta->query($sql_agend);
if ($res_agend && $res_agend->num_rows > 0) {
    while ($row = $res_agend->fetch_assoc()) {
        $response['agendamentos'][] = $row;
    }
}

// Extrato de Pontos
$sql_pts = "SELECT id_pontuacao, nr_pontos, nm_tipo, ds_descricao, dt_cadastro
            FROM tb_pontuacao
            WHERE id_user = $id_user
            ORDER BY dt_cadastro DESC";

$res_pts = $conecta->query($sql_pts);
if ($res_pts && $res_pts->num_rows > 0) {
    while ($row = $res_pts->fetch_assoc()) {
        $response['pontos'][] = $row;
    }
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$conecta->close();
?>
