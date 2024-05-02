// Função para obter o valor atual do contador de visitantes
function getVisitCount() {
    // Verifica se já existe um contador armazenado localmente
    if (localStorage.getItem('visitCount')) {
        // Se existir, retorna o valor do contador armazenado
        return parseInt(localStorage.getItem('visitCount'));
    } else {
        // Caso contrário, retorna 0
        return 0;
    }
}

// Função para incrementar o contador de visitantes e exibi-lo na página
function incrementVisitCount() {
    // Obtém o valor atual do contador
    var visitCount = getVisitCount();

    // Incrementa o contador
    visitCount++;

    // Atualiza o valor do contador na página
    document.getElementById('contador').textContent = visitCount;

    // Armazena o novo valor do contador localmente
    localStorage.setItem('visitCount', visitCount);
}

// Chama a função para incrementar o contador quando a página é carregada
window.onload = function() {
    incrementVisitCount();
};
