    function formatarValor(input) {
    var valorFormatado = input.value.replace(/\D+/g, '');
    input.value = valorFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    
    function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    //Button para resetar os campos 
    function resetCalculadora(button) {    
        document.getElementById("valor-bem").value = "";
        document.getElementById("parcelas").value = "";

        var clean = document.querySelectorAll('.reset');
            clean.innerHTML = "";

        var botoesTipoBem = document.querySelectorAll('.tipo-bem');
            botoesTipoBem.forEach(function (btn) {
                    btn.classList.remove('selected');
                });
    }

    function selecionarTipoBem(button) {
    var botoesTipoBem = document.querySelectorAll('.tipo-bem');
    botoesTipoBem.forEach(function(btn) {
    btn.classList.remove('selected');
    });
    button.classList.add('selected');
    }
    
    function calcularParcelas() {
    var valorBemInput = document.getElementById("valor-bem");
    var valorBem = parseFloat(valorBemInput.value.replace(/\D+/g, '').replace(',', '.'));
    var tipoBem = document.querySelector('.tipo-bem.selected').getAttribute('data-value');
    var parcelas = parseInt(document.getElementById("parcelas").value);
    var reducao = 0.25; // 25% de redução
    var taxaJurosAnual = 0; // Taxa de juros ao ano inicializada com 0 para consórcio
    
    // Define a taxa de juros anual de acordo com o tipo de bem
    if (tipoBem === 'automovel') {
    taxaJurosAnual = 0.12; // 12% ao ano para automóveis
    } else if (tipoBem === 'imovel') {
    taxaJurosAnual = 0.099; // 9.9% ao ano para imóveis
    }
    
    var valorParcelaConsorcio = (valorBem / parcelas) * (1 - reducao);
    
    // Calcula o valor total financiado e a parcela mensal do financiamento
    var taxaJurosMensal = taxaJurosAnual / 12; // Taxa de juros mensal
    var valorTotalFinanciado = valorBem * (1 + taxaJurosMensal * parcelas);
    var valorParcelaFinanciamento = valorTotalFinanciado / parcelas;
    
    var resultadoHTML = "<h2>Valor estimado das parcelas até a contemplação (Consórcio):</h2>";
    resultadoHTML += "<p>" + formatarMoeda(valorParcelaConsorcio) + " por mês.</p>";
    resultadoHTML += "<h2>Valor total do bem e parcela mensal (Financiamento):</h2>";
    resultadoHTML += "<p>Valor Total do Bem Financiado: " + formatarMoeda(valorTotalFinanciado) + "</p>";
    resultadoHTML += "<p>Parcela do Financiamento: " + formatarMoeda(valorParcelaFinanciamento) + " por mês.</p>";

    resultado.innerHTML = resultadoHTML;

    }