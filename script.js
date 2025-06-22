function calcular() {
  const g = 9.81;
  const rho = parseFloat(document.getElementById("densidad").value);

  const P1 = parseFloat(document.getElementById("P1").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const h1 = parseFloat(document.getElementById("h1").value);
  const P2 = parseFloat(document.getElementById("P2").value);
  const v2 = parseFloat(document.getElementById("v2").value);
  const h2 = parseFloat(document.getElementById("h2").value);

  const variable = document.getElementById("variableACalcular").value;
  let resultado = 0;

  try {
    switch (variable) {
      case "P1":
        resultado = P2 + 0.5 * rho * (v2**2 - v1**2) + rho * g * (h2 - h1);
        break;
      case "v1":
        resultado = Math.sqrt((2 / rho) * (P2 - P1 + 0.5 * rho * v2**2 + rho * g * (h2 - h1)));
        break;
      case "h1":
        resultado = (P2 - P1 + 0.5 * rho * (v2**2 - v1**2)) / (rho * g) + h2;
        break;
      case "P2":
        resultado = P1 + 0.5 * rho * (v1**2 - v2**2) + rho * g * (h1 - h2);
        break;
      case "v2":
        resultado = Math.sqrt((2 / rho) * (P1 - P2 + 0.5 * rho * v1**2 + rho * g * (h1 - h2)));
        break;
      case "h2":
        resultado = (P1 - P2 + 0.5 * rho * (v1**2 - v2**2)) / (rho * g) + h1;
        break;
    }

    document.getElementById("resultado").innerText =
      `✅ ${variable} = ${resultado.toFixed(2)} (unidades SI)`;

    dibujarGrafico(rho, P1, v1, h1, P2, v2, h2);

  } catch (e) {
    document.getElementById("resultado").innerText = "❌ Error: Verifica tus valores.";
  }
}

function reiniciar() {
  document.querySelectorAll("input").forEach(input => input.value = "");
  document.getElementById("resultado").innerText = "";
  const ctx = document.getElementById("grafico").getContext("2d");
  ctx.clearRect(0, 0, 600, 300);
}

function dibujarGrafico(rho, P1, v1, h1, P2, v2, h2) {
  const g = 9.81;
  const canvas = document.getElementById("grafico");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Energías en cada punto
  const punto1 = {
    presion: isNaN(P1) ? 0 : P1,
    cinetica: isNaN(v1) ? 0 : 0.5 * rho * v1 ** 2,
    potencial: isNaN(h1) ? 0 : rho * g * h1,
  };

  const punto2 = {
    presion: isNaN(P2) ? 0 : P2,
    cinetica: isNaN(v2) ? 0 : 0.5 * rho * v2 ** 2,
    potencial: isNaN(h2) ? 0 : rho * g * h2,
  };

  const total1 = punto1.presion + punto1.cinetica + punto1.potencial;
  const total2 = punto2.presion + punto2.cinetica + punto2.potencial;
  const escala = 200 / Math.max(total1, total2);

  const drawBar = (x, label, valor, color) => {
    const altura = valor * escala;
    ctx.fillStyle = color;
    ctx.fillRect(x, 250 - altura, 40, altura);
    ctx.fillStyle = "#000";
    ctx.fillText(label, x, 270);
  };

  drawBar(80, "P1", punto1.presion, "#3498db");
  drawBar(130, "v1", punto1.cinetica, "#2ecc71");
  drawBar(180, "h1", punto1.potencial, "#f39c12");

  drawBar(330, "P2", punto2.presion, "#3498db");
  drawBar(380, "v2", punto2.cinetica, "#2ecc71");
  drawBar(430, "h2", punto2.potencial, "#f39c12");
}