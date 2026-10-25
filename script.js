/* ========================================
   Phomps Shop - JavaScript básico
   - Menu abre/fecha
   - Botão Adicionar (carrinho)
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

  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });

  // ---------- CARRINHO / BOTÃO ADICIONAR ----------
  let quantidadeCarrinho = 0;
  const cartCount = document.getElementById("cart-count");
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function mostrarToast(texto) {
    toast.textContent = texto;
    toast.hidden = false;
    // força reflow para animar
    toast.classList.remove("show");
    void toast.offsetWidth;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () {
        toast.hidden = true;
      }, 300);
    }, 2200);
  }

  const botoesAdd = document.querySelectorAll(".btn-add");
  botoesAdd.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const nome = botao.getAttribute("data-nome");
      const preco = botao.getAttribute("data-preco");

      quantidadeCarrinho = quantidadeCarrinho + 1;
      cartCount.textContent = quantidadeCarrinho;

      // feedback visual no botão
      const textoOriginal = botao.textContent;
      botao.textContent = "Adicionado ✓";
      botao.classList.add("added");
      botao.disabled = true;

      setTimeout(function () {
        botao.textContent = textoOriginal;
        botao.classList.remove("added");
        botao.disabled = false;
      }, 1200);

      mostrarToast(nome + " adicionado ao carrinho!");
    });
  });

  // Clique no ícone do carrinho
  document.getElementById("cart-btn").addEventListener("click", function () {
    if (quantidadeCarrinho === 0) {
      mostrarToast("Seu carrinho está vazio.");
    } else {
      mostrarToast("Você tem " + quantidadeCarrinho + " item(ns) no carrinho.");
    }
  });

  // ---------- CÁLCULO DE FRETE (if/else) ----------
  const formFrete = document.getElementById("form-frete");
  const resultadoFrete = document.getElementById("resultado-frete");

  formFrete.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const cepInput = document.getElementById("cep");
    const valorInput = document.getElementById("valor");

    const cep = cepInput.value.trim().replace(/\D/g, "");
    const valor = parseFloat(valorInput.value);

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

  // Máscara de CEP
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

    document.getElementById("erro-nome").textContent = "";
    document.getElementById("erro-email").textContent = "";
    document.getElementById("erro-mensagem").textContent = "";
    msgSucesso.hidden = true;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    let valido = true;

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
      msgSucesso.hidden = false;
      formContato.reset();
    }
  });

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
