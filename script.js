const rho = 1000; // kg/m³
const g = 9.81;   // m/s²

function calcularBernoulli() {
  const P2 = parseFloat(document.getElementById('P2').value);
  const v2 = parseFloat(document.getElementById('v2').value);
  const h2 = parseFloat(document.getElementById('h2').value);

  let resultado = '';
  let calculado = false;

  if (isNaN(P2)) {
    const valor = calcularP2(v2, h2);
    resultado = `Presión P₂ = ${valor.toFixed(2)} Pa`;
    calculado = true;
  } else if (isNaN(v2)) {
    const valor = calcularV2(P2, h2);
    resultado = `Velocidad v₂ = ${valor.toFixed(2)} m/s`;
    calculado = true;
  } else if (isNaN(h2)) {
    const valor = calcularH2(P2, v2);
    resultado = `Altura h₂ = ${valor.toFixed(2)} m`;
    calculado = true;
  } else {
    resultado = "❌ Por favor, deja vacía una variable para calcular.";
  }

  document.getElementById('resultado').innerText = resultado;

  if (calculado) {
    dibujarGrafico(P2, v2, h2);
  }
}

function calcularP2(v, h) {
  return 200000 - 0.5 * rho * v * v - rho * g * h;
}

function calcularV2(P, h) {
  return Math.sqrt((2 / rho) * (200000 - P - rho * g * h));
}

function calcularH2(P, v) {
  return (200000 - P - 0.5 * rho * v * v) / (rho * g);
}

function reiniciar() {
  document.getElementById('P2').value = '';
  document.getElementById('v2').value = '';
  document.getElementById('h2').value = '';
  document.getElementById('resultado').innerText = '';
  const canvas = document.getElementById('grafico');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarGrafico(P, v, h) {
  const canvas = document.getElementById('grafico');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const datos = [
    { nombre: 'Presión', valor: P || 0 },
    { nombre: 'Velocidad²', valor: 0.5 * rho * (v || 0) ** 2 },
    { nombre: 'Altura', valor: rho * g * (h || 0) }
  ];

  const maxVal = Math.max(...datos.map(d => d.valor));

  datos.forEach((d, i) => {
    const altura = (d.valor / maxVal) * 150;
    ctx.fillStyle = ['#0074D9', '#2ECC40', '#FF4136'][i];
    ctx.fillRect(50 + i * 100, 180 - altura, 50, altura);
    ctx.fillStyle = '#000';
    ctx.fillText(d.nombre, 50 + i * 100, 195);
  });
}