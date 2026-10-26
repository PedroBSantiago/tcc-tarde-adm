# ✈️ Explorar + | Agência de Turismo & Experiências
### Trabalho de Conclusão de Curso (TCC) — Curso de Administração

<div align="center">

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo%20%2F%20Ativo-brightgreen?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**Plataforma web integrada para agenciamento de viagens, reservas personalizadas, fidelização por milhas e consultoria inteligente de destinos paulistas.**

[Destinos](#-destinos-oficiais-e-hospedagens) •
[Funcionalidades](#-funcionalidades-e-telas-do-sistema) •
[Banco de Dados](#-banco-de-dados-mysql) •
[Como Executar](#-como-executar-o-projeto) •
[Estrutura de Arquivos](#-estrutura-do-projeto)

</div>

---

## 📌 Sobre o Projeto

O projeto **Explorar +** é um Trabalho de Conclusão de Curso (TCC) desenvolvido para o curso de **Administração**. Ele une planejamento estratégico, modelo de negócios turístico e tecnologia digital para criar uma agência de turismo especializada nos três polos mais expressivos do interior paulista:

1. **Brotas:** Capital Nacional do Ecoturismo e Aventura Radical.
2. **São Roque:** A icônica Rota do Vinho, Enogastronomia e Charme Rural.
3. **Campos do Jordão:** A Suíça Brasileira na Serra da Mantiqueira.

A plataforma soluciona a fragmentação do turismo regional oferecendo um ecossistema completo: recomendação automatizada com quiz de perfil, vitrine de pacotes exclusivos, simulação e agendamento de reservas em tempo real, além de um inovador programa de pontos e fidelidade para retenção de clientes.

---

## 🏔️ Destinos Oficiais e Hospedagens

Cada destino conta com pacotes estruturados, hospedagem de alto padrão selecionada e curadoria de atrações turísticas imperdíveis:

| Destino | Perfil Turístico | Hospedagem Oficial | Preço Base | Principais Atrações |
| :--- | :--- | :--- | :---: | :--- |
| **Brotas** | Ecoturismo & Aventura | **Pousada Estalagem de Brotas** | **R$ 1.550** | Rafting no Rio Jacaré-Pepira, Cachoeira Cassorova, Areia que Canta, Tirolesas nos Cânions |
| **São Roque** | Enoturismo & Gastronomia | **Villa Maior Hotel** | **R$ 771** | Estrada do Vinho & Góes, Quinta do Olivardo, Ski Mountain Park, Morro do Saboó |
| **Campos do Jordão** | Serra, Romântico & Luxo | **Hotel Castelo Nacional Inn Campos do Jordão** | **R$ 1.341** | Vila Capivari & Teleférico, Parque Amantikir, Pico do Itapeva, Palácio Boa Vista |

---

## ✨ Funcionalidades e Telas do Sistema

O portal é composto por **9 telas integradas**, combinando design responsivo, estética moderna com *glassmorphism* e integração ao banco de dados:

### 1. 🏠 Página Inicial (`html/index.html`)
- Apresentação da proposta de valor da agência.
- Vitrine dos destinos mais populares com imagens temáticas e faixas de preço atualizadas.
- Guia interativo "Como Funciona" em 4 passos (Descubra, Escolha, Agende e Viaje).
- Depoimentos reais de clientes e newsletter.

### 2. 🗺️ Catálogo de Destinos & Atrações (`html/destinos.html`)
- Busca preditiva em tempo real e filtros por categoria (Aventura, Enoturismo, Serra).
- Cards detalhados com informações de hospedagem recomendada e faixas de preço.
- **Seção de Atrações Imperdíveis das Cidades:** Curadoria de 12 atividades turísticas com fotos em alta definição, badges de atividade, localização e descrições detalhadas.
- Filtro rápido interativo de atrações por cidade.
- Tabela comparativa de destinos (estilo, clima, hospedagem inclusa, preço e distância da capital).

### 3. 🎒 Vitrine de Pacotes (`html/pacotes.html`)
- Pacotes fechados para cada destino com duração, fotos atrativas, hotelaria parceira e preço por pessoa:
  - *Brotas Aventura Radical* & *Brotas Ecoturismo & Relax* (R$ 1.550)
  - *São Roque Rota do Vinho* & *São Roque Romântico & Vinhos* (R$ 771)
  - *Campos do Jordão Inverno & Charme* & *Campos do Jordão Mantiqueira VIP* (R$ 1.341)
- Destaques de itens inclusos (café, guias, passeios e transporte).

### 4. 📅 Sistema de Agendamentos & Reservas (`html/agendamentos.html`)
- Seleção dinâmica de destino e pacote com atualização instantânea da interface.
- Seleção de datas de partida e retorno com validação inteligente.
- Seletor de viajantes (cálculo automático proporcional de valores e pontos).
- Adicionais opcionais (Seguro Viagem, Transfer Executivo, Jantar Especial).
- Resumo de reserva (*Sticky Summary Card*) com cálculo em tempo real e projeção de pontos ganhos.

### 5. 🧭 Quiz de Recomendação de Destino (`html/questionario.html`)
- Quiz inteligente que diagnostica o perfil do viajante através de 6 perguntas (clima preferido, tipo de viagem, orçamento, duração, atividades e companhia).
- Algoritmo que calcula a pontuação e indica a viagem ideal entre Brotas, São Roque ou Campos do Jordão.
- Salva as respostas no banco de dados para inteligência comercial.

### 6. 💎 Programa de Fidelidade & Pontuação (`html/pontuacao.html`)
- Extrato de milhas do usuário (ganha 1 ponto a cada R$ 1 gasto em reservas).
- Bônus de boas-vindas automático de 500 pontos no cadastro.
- Catálogo de resgate de recompensas (descontos, passeios de rafting, degustações e upgrades de diária).

### 7. 👤 Painel do Usuário (`html/usuario.html`)
- Dashboard completo do cliente com dados cadastrais.
- Lista de viagens ativas, agendamentos confirmados e histórico de viagens concluídas.
- Cancelamento de reservas e acompanhamento de status.

### 8. 🔐 Autenticação & Cadastro (`html/login.html` & `html/cadastro.html`)
- Formulários com validação visual de senha forte e máscara de telefone.
- Login com sessão segura em PHP.
- Criação de novos usuários com atribuição instantânea dos pontos de boas-vindas.

---

## 🗄️ Banco de Dados (MySQL)

O banco de dados relacional foi modelado para suportar operações transacionais completas de turismo:

```sql
db_explorarmais
 ├── tb_user          (Usuários, senhas, contato, saldo de pontos)
 ├── tb_destino       (Destinos, slogans, descrições, preços base, fotos)
 ├── tb_pacote        (Pacotes, hotéis parceiros, dias, preços, itens inclusos)
 ├── tb_agendamento   (Reservas, passageiros, datas, valores totais, status)
 ├── tb_questionario  (Respostas do quiz e diagnósticos de perfil)
 └── tb_pontuacao     (Histórico de crédito e resgate de pontos)
```

O script completo de criação com dados de demonstração está localizado em:  
📁 [`sql/bancoDD.sql`](sql/bancoDD.sql)

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - HTML5 Semântico com foco em acessibilidade e SEO.
  - CSS3 puro com variáveis customizadas, *Glassmorphism*, gradientes modernos e total responsividade.
  - JavaScript Vanilla (ES6+) moderno, modular e sem dependências pesadas externas.
- **Backend:**
  - PHP 7.4+ estruturado para consumo de formulários assíncronos e processamento seguro.
  - *Prepared Statements* (MySQLi) para prevenção de ataques de SQL Injection.
  - Gerenciamento de sessões com `session_start()`.
- **Banco de Dados:**
  - MySQL 8.0 / MariaDB com integridade referencial (`FOREIGN KEY ... ON DELETE CASCADE`).
- **Design & Tipografia:**
  - Google Fonts (*Outfit* para títulos e *Inter* para corpo do texto).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Ter um servidor web local instalado: [XAMPP](https://www.apachefriends.org/pt_br/index.html), [WampServer](https://www.wampserver.com/) ou [Laragon](https://laragon.org/).
- Navegador web moderno (Chrome, Edge, Firefox, Safari).

### Passo a Passo

1. **Clonar ou posicionar os arquivos:**
   Copie a pasta do projeto para o diretório raiz do seu servidor local:
   - No XAMPP: `C:\xampp\htdocs\tcc-tarde-adm\`

2. **Iniciar os Serviços:**
   - Abra o painel do XAMPP e inicialize os módulos **Apache** e **MySQL**.

3. **Configurar o Banco de Dados:**
   - Acesse o phpMyAdmin em seu navegador: `http://localhost/phpmyadmin`
   - Crie o banco de dados ou clique na aba **Importar** (*Import*).
   - Selecione o arquivo [`sql/bancoDD.sql`](sql/bancoDD.sql) presente no projeto e clique em **Executar**.
   - O banco `db_explorarmais` será criado com todas as tabelas e dados pré-cadastrados.

4. **Acessar a Aplicação:**
   - Abra o navegador e navegue até:
     ```
     http://localhost/tcc-tarde-adm/html/index.html
     ```

### 🔑 Credenciais de Demonstração
Para testar o acesso imediato:
- **E-mail:** `admin@explorarmais.com.br`
- **Senha:** `123456`
- **Saldo Inicial:** `3.850 pontos`

---

## 📁 Estrutura do Projeto

```text
tcc-tarde-adm/
├── css/
│   ├── agendamentos.css     # Estilos da página de reservas
│   ├── auth.css             # Estilos de login e recuperação
│   ├── cadastro.css         # Estilos do formulário de cadastro
│   ├── destinos.css         # Estilos de destinos e atrações
│   ├── global.css           # Design system, tipografia e variáveis
│   ├── index.css            # Estilos da página inicial
│   ├── pacotes.css          # Estilos da grade de pacotes
│   ├── pontuacao.css        # Estilos do programa de fidelidade
│   ├── questionario.css     # Estilos do quiz de destinos
│   └── usuario.css          # Estilos do dashboard do cliente
├── html/
│   ├── agendamentos.html    # Tela de agendamento e simulação
│   ├── cadastro.html        # Tela de criação de conta
│   ├── destinos.html        # Tela de destinos e atrações
│   ├── index.html           # Tela principal / Home
│   ├── login.html           # Tela de autenticação
│   ├── pacotes.html         # Tela de pacotes oficiais
│   ├── pontuacao.html       # Tela de pontos e recompensas
│   ├── questionario.html    # Tela de quiz de recomendação
│   └── usuario.html         # Painel do cliente
├── JS/
│   ├── agendamentos.js      # Lógica de cálculo, datas e pacotes
│   ├── destinos.js          # Filtros de busca e atrações
│   ├── main.js              # Navbar, scroll e animações globais
│   ├── questionario.js      # Algoritmo de decisão do quiz
│   ├── senha.js             # Validações de segurança
│   └── usuario.js           # Gestão de dados e viagens do usuário
├── php/
│   ├── agendar.php          # Gravação de reservas no banco
│   ├── cancelar_agendamento.php # Cancelamento de viagens
│   ├── conexao.php          # Conexão com o MySQL via MySQLi
│   ├── get_dados_usuario.php# API de consulta do cliente
│   ├── insert_de_users.php  # Registro de novos usuários
│   ├── login.php            # Validação de credenciais
│   ├── logout.php           # Encerramento de sessão
│   ├── resgatar_pontos.php  # Transação de débito de milhas
│   └── salvar_quiz.php      # Persistência de resultados do quiz
├── sql/
│   └── bancoDD.sql          # DDL e DML completo do sistema
└── README.md                # Documentação técnica e acadêmica do TCC
```

---

## 👥 Equipe do TCC

- **Curso:** Administração
- **Turma:** Tarde
- **Projeto:** Explorar + Agência de Viagens & Turismo

---

<div align="center">
  <sub>Desenvolvido com dedicação acadêmica e excelência técnica para o TCC de Administração.</sub>
</div>
