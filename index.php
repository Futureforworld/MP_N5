<?php
// Lista de domínios permitidos
$allowedDomains = ['seusite.com', 'localhost'];  

// Recebe a URL via GET
$redirectUrl = $_GET['url'] ?? '';

// Remove caracteres CRLF
$redirectUrl = str_replace(["\r", "\n"], '', $redirectUrl);

// Valida o domínio da URL
$parsedUrl = parse_url($redirectUrl);
if (!$parsedUrl || !in_array($parsedUrl['host'] ?? '', $allowedDomains)) {
    die('Redirecionamento não permitido!');
}

// Redireciona se for seguro
header('Location: ' . $redirectUrl);
exit;
?>
