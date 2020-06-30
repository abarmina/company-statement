import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
  return renderPlainText(createstatementData(invoice, plays));
}
 
function renderPlainText(data, plays) {
  let result = 'Счет для ${data.customer}\n';
 
  for (let perf of data.performances) {
    result += ' ${perf.play.name}: ${usd(perf.amount)}';
    result += ' (${perf.audience} мест)\n';
  }
  result += 'Итого с вас $(usd(data.totalAmount)}\n';
  result += 'Вы заработали ${data.totalVolumeCredits} бонусов\n';
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml (data) {
  let result = `<h1>Счет для ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>спектакль</th><th>места</th><th>стоимость</th></tr>";
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td>`;
    result += `<td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += `</table>\n`;
  result += `<p>Итого с вас `;
  result += `<em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>Вы заработали <em>${data.totalVolumeCredits}`;
  result += `</em> бонусов</p>\n`;
  return result;
}
 
function usd(number) {
  return new Intl.NumberFormat("ru-RU",
    { style: "currency", currency: "RUB",
    minimumFractionDigits: 2 }).format(number/100);
}
