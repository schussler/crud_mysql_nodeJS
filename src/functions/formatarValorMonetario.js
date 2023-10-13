function formatarValorMonetario(valor) {
  // Lógica para formatar o valor como moeda, por exemplo, utilizando toLocaleString() ou numeral.js
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

module.exports = formatarValorMonetario;