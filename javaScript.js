let numeroAleatorio;
let tentativasRestantes;
let tentativasFeitas;

let timer;
let tempoRestante = 60;

window.onload = function () {
  let explocao = document.getElementById("explocao");
  if (explocao) {
    explocao.style.display = "none";
  }
  let gerarNumero = document.getElementById("gerarNumero");
  if (gerarNumero) {
    gerarNumero.classList.remove("oculto");
  }
};


function playAudio(){
  let audioJogo = new Audio("musicaJogo");
  audioJogo.volume = 1.0;
  audioJogo.play();
  
}


function iniciarCronometro() {

  playAudio();

  tempoRestante = 60;
  document.getElementById("timer").textContent = "01:00";

  timer = setInterval(function () {
    tempoRestante--;

    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    document.getElementById("timer").textContent = `${minutos}:${segundos}`;

    if (tempoRestante <= 0) {
      clearInterval(timer);
      document.getElementById("mensagemFinal").textContent =
        "💥 O tempo acabou! Você perdeu!";
      document.getElementById("mensagemFinal").style.color = "red";
      fimDoJogoPerdido();
    }
  }, 1000);
}

document.getElementById("gerarNumero").addEventListener("click", function () {
  numeroAleatorio = Math.floor(Math.random() * 101);
  tentativasRestantes = 5;
  tentativasFeitas = [];

  iniciarCronometro();

  let jogo = document.getElementById("jogo");
  jogo.classList.remove("oculto");
  jogo.style.display = "block";

  document.getElementById("explocao").classList.add("oculto");
  document.getElementById("explocao").style.display = "none";
  document.getElementById("gerarNumero").classList.add("oculto");
  document.getElementById("tentativasRestantes").textContent =
    tentativasRestantes;

  let tentativaDivs = document.querySelectorAll(".tentativa span");
  let dicasDivs = document.querySelectorAll(".dica");
  let tentativaContainers = document.querySelectorAll(".tentativa");

  tentativaDivs.forEach((div) => (div.textContent = ""));
  dicasDivs.forEach((dica) => (dica.textContent = ""));

  tentativaContainers.forEach((div) => {
    div.classList.remove("acerto", "erro");
  });

  console.log("Número gerado:", numeroAleatorio);

});

document.getElementById("reiniciar").addEventListener("click", function () {
  document.getElementById("explocao").classList.add("oculto");
  document.getElementById("jogo").classList.add("oculto");
  document.getElementById("gerarNumero").classList.remove("oculto");
  document.getElementById("escolha").value = "";
  clearInterval(timer);
});

function fimDoJogoGanho() {
  clearInterval(timer);
  document.getElementById("mensagemFinal").textContent = "🎉Parabéns, Bomba Desativada!🎉";
  document.getElementById("mensagemFinal").style.color = "green";
  document.getElementById("reiniciar").style.display = "block";
  document.getElementById("jogo").classList.add("oculto");
}

function fimDoJogoPerdido() {
    clearInterval(timer);

    let video = document.getElementById("videoExplosao");

    

    document.getElementById("explocao").style.display = "block";
    document.getElementById("explocao").classList.remove("oculto");

    

    video.style.display = "block";
    video.play().catch(error => console.error('Erro ao reproduzir o vídeo:', error));
    
    video.onended = function () {
      video.style.zIndex = "-2";
    };

    function playAudio(){
      let audioPerder = new Audio("ExplosionMeme.mp3");
      audioPerder.play();
      audioPerder.volume = 1.0;
    }
  
    playAudio().catch(error => console.error('Erro ao reproduzir o áudio:', error));

    
    document.getElementById("reiniciar").style.display = "block";
    document.getElementById("jogo").classList.add("oculto");
}


document.getElementById("enviar").addEventListener("click", function () {
  let escolhaInput = document.getElementById("escolha");
  let escolha = parseInt(escolhaInput.value);

  if (isNaN(escolha) || escolha < 0 || escolha > 100) {
    alert("Digite um número válido entre 0 e 100!");
    escolhaInput.style.border = "2px solid red";
    return;
  } else {
    escolhaInput.style.border = "";''
  }

  if (tentativasRestantes <= 0) return;

  tentativasFeitas.push(escolha);
  tentativasRestantes--;
  document.getElementById("tentativasRestantes").textContent = tentativasRestantes;

  let indice = tentativasFeitas.length - 1;
  document.getElementById(`palpite${indice + 1}`).textContent = escolha;

  if (escolha === numeroAleatorio) {
    document.getElementById(`palpite${indice + 1}`).parentElement.classList.add("acerto");
    fimDoJogoGanho();
  } else {
    document.getElementById(`palpite${indice + 1}`).parentElement.classList.add("erro");
    document.getElementById(`dica${indice + 1}`).textContent =
      escolha > numeroAleatorio ? "TENTE UM NUMERO MENOR!🔽" : "TENTE UM NUMERO MAIOR!🔼";

    if (tentativasRestantes === 0) {
      document.getElementById("mensagemFinal").textContent = `❌ Você perdeu! O número era ${numeroAleatorio}.`;
      document.getElementById("mensagemFinal").style.color = "red";
      fimDoJogoPerdido();
    }
  }
  limparCampo();
});


document.getElementById("escolha").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("enviar").click();
    limparCampo();
  }
});

  function limparCampo() {
    document.getElementById("escolha").value = "";
  }
  

  
