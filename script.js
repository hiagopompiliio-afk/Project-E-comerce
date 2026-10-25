/* ========================================
   ByteShop - JavaScript básico
   - Menu abre/fecha
   - Cálculo de frete com if/else
   - Validação do formulário de contato
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  // ---------- MENU MOBILE ----------
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  menuToggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao clicar em um link (útil no mobile)
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });

  // ---------- CÁLCULO DE FRETE (if/else) ----------
  const formFrete = document.getElementById("form-frete");
  const resultadoFrete = document.getElementById("resultado-frete");

  formFrete.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const cepInput = document.getElementById("cep");
    const valorInput = document.getElementById("valor");

    const cep = cepInput.value.trim().replace(/\D/g, ""); // só números
    const valor = parseFloat(valorInput.value);

    // Validação simples de CEP (8 dígitos)
    if (cep.length !== 8) {
      resultadoFrete.textContent = "CEP inválido. Digite um CEP com 8 dígitos.";
      resultadoFrete.className = "resultado-frete erro";
      return;
    }

    if (isNaN(valor) || valor <= 0) {
      resultadoFrete.textContent = "Informe um valor de compra válido.";
      resultadoFrete.className = "resultado-frete erro";
      return;
    }

    // Cálculo de frete com if/else
    // Regra simples de exemplo:
    // - Valor >= 300 → frete grátis
    // - Valor >= 150 → frete R$ 15,00
    // - Valor < 150  → frete R$ 25,00
    let frete;
    let mensagem;

    if (valor >= 300) {
      frete = 0;
      mensagem = "Parabéns! Frete GRÁTIS para compras a partir de R$ 300,00.";
    } else if (valor >= 150) {
      frete = 15.0;
      mensagem = "Frete: R$ 15,00 (desconto para compras acima de R$ 150,00).";
    } else {
      frete = 25.0;
      mensagem = "Frete: R$ 25,00.";
    }

    const total = valor + frete;
    resultadoFrete.innerHTML =
      mensagem +
      "<br>Valor dos produtos: R$ " +
      valor.toFixed(2).replace(".", ",") +
      "<br><strong>Total com frete: R$ " +
      total.toFixed(2).replace(".", ",") +
      "</strong>";
    resultadoFrete.className = "resultado-frete sucesso";
  });

  // Máscara simples de CEP (00000-000)
  const cepCampo = document.getElementById("cep");
  cepCampo.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "");
    if (v.length > 5) {
      v = v.slice(0, 5) + "-" + v.slice(5, 8);
    }
    this.value = v;
  });

  // ---------- VALIDAÇÃO DO FORMULÁRIO DE CONTATO ----------
  const formContato = document.getElementById("form-contato");
  const msgSucesso = document.getElementById("msg-sucesso");

  formContato.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Limpa mensagens de erro anteriores
    document.getElementById("erro-nome").textContent = "";
    document.getElementById("erro-email").textContent = "";
    document.getElementById("erro-mensagem").textContent = "";
    msgSucesso.hidden = true;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    let valido = true;

    // Validação nativa + mensagens personalizadas
    if (!nome.checkValidity()) {
      document.getElementById("erro-nome").textContent =
        "Informe seu nome (mínimo 3 caracteres).";
      valido = false;
    }

    if (!email.checkValidity()) {
      document.getElementById("erro-email").textContent =
        "Informe um e-mail válido.";
      valido = false;
    }

    if (!mensagem.checkValidity()) {
      document.getElementById("erro-mensagem").textContent =
        "A mensagem precisa ter pelo menos 10 caracteres.";
      valido = false;
    }

    if (valido) {
      // Simula envio bem-sucedido
      msgSucesso.hidden = false;
      formContato.reset();
    }
  });

  // Feedback em tempo real ao sair do campo (blur)
  ["nome", "email", "mensagem"].forEach(function (id) {
    const campo = document.getElementById(id);
    campo.addEventListener("blur", function () {
      const erro = document.getElementById("erro-" + id);
      if (!campo.checkValidity()) {
        if (id === "nome") erro.textContent = "Informe seu nome (mínimo 3 caracteres).";
        if (id === "email") erro.textContent = "Informe um e-mail válido.";
        if (id === "mensagem") erro.textContent = "A mensagem precisa ter pelo menos 10 caracteres.";
      } else {
        erro.textContent = "";
      }
    });
  });
});
