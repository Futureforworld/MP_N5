# MP_N5
Software Security

Este projeto foi desenvolvido como uma resposta prática a uma situação realista de falha de segurança em uma aplicação legada. A aplicação, estruturada em frontend e backend (API REST), apresentava uma vulnerabilidade crítica no controle de sessão, permitindo o acesso indevido a recursos sensíveis por meio da manipulação do parâmetro session-id.

Durante a análise, detectamos que o session-id era gerado a partir de um processo de criptografia inseguro, baseado em dados previsíveis como o nome da empresa, tornando-o suscetível a ataques de força bruta. Além disso, não havia nenhum tipo de sanitização ou validação dos parâmetros recebidos nas requisições, abrindo espaço para injeções de código malicioso.

A partir disso, realizei a refatoração completa do backend, com foco nos seguintes pontos:

  Substituição da lógica de autenticação por um mecanismo robusto com tokens seguros;

  Implementação de validação e sanitização de entradas;

  Reestruturação das rotas para evitar exposição indevida de dados sensíveis;

  Adoção de boas práticas de segurança, como uso de middleware e práticas recomendadas do Express.js.
 
O projeto reforça a importância de revisões contínuas de segurança em sistemas legados e a aplicação de princípios modernos de desenvolvimento seguro.
