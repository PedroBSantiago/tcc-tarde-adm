<?php
include 'conexao.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

$id_user = isset($_SESSION['id_user']) ? $_SESSION['id_user'] : (isset($_POST['id_user']) ? intval($_POST['id_user']) : null);
$nm_clima = isset($_POST['clima']) ? $_POST['clima'] : '';
$nm_tipo_viagem = isset($_POST['tipo_viagem']) ? $_POST['tipo_viagem'] : '';
$nm_orcamento = isset($_POST['orcamento']) ? $_POST['orcamento'] : '';
$nm_duracao = isset($_POST['duracao']) ? $_POST['duracao'] : '';
$nm_atividades = isset($_POST['atividades']) ? $_POST['atividades'] : '';
$nm_companhia = isset($_POST['companhia']) ? $_POST['companhia'] : '';
$ds_resultado = isset($_POST['resultado']) ? $_POST['resultado'] : '';

$stmt = $conecta->prepare("INSERT INTO tb_questionario (id_user, nm_clima, nm_tipo_viagem, nm_orcamento, nm_duracao, nm_atividades, nm_companhia, ds_resultado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isssssss", $id_user, $nm_clima, $nm_tipo_viagem, $nm_orcamento, $nm_duracao, $nm_atividades, $nm_companhia, $ds_resultado);

if ($stmt->execute()) {
    // Se o usuário estiver logado, ganha 50 pontos por responder o quiz
    if ($id_user) {
        $conecta->query("UPDATE tb_user SET nr_pontos = nr_pontos + 50 WHERE id_user = $id_user");
        $desc = "Bônus por completar o Quiz de Destinos";
        $conecta->query("INSERT INTO tb_pontuacao (id_user, nr_pontos, nm_tipo, ds_descricao) VALUES ($id_user, 50, 'credito', '$desc')");
    }

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Resultado do questionário salvo com sucesso!',
        'destino_recomendado' => $ds_resultado
    ]);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao salvar questionário.']);
}

$stmt->close();
$conecta->close();
?>
