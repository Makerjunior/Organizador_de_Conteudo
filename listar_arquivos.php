<?php

$dir = $_GET['dir']; // Obtém o caminho da pasta a partir da query string

// Verifica se o diretório existe
if (is_dir($dir)) {
  $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir)); // Cria um iterador recursivo para percorrer todos os arquivos e pastas dentro da pasta
  $fileList = [];

  foreach ($iterator as $file) {
    if ($file->isFile()) { // Verifica se o item é um arquivo
      $filePath = $file->getPathname();
      $filePath = str_replace($dir . '/', '', $filePath); // Remove a parte inicial do caminho que corresponde à pasta especificada na query string
      $fileList[] = $filePath; // Adiciona o caminho completo do arquivo à lista de arquivos
    }
  }

  echo json_encode($fileList); // Retorna a lista de arquivos como uma resposta JSON
} else {
  echo json_encode([]); // Retorna uma lista vazia caso o diretório não exista
}
