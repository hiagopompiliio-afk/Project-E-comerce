/* 
   Phomps Shop - Página do Carrinho
   Lê e edita o carrinho salvo no localStorage
   */

document.addEventListener("DOMContentLoaded", function () {
  const CHAVE = "phomps_carrinho";
  function lerCarrinho() {
    try {
      const dados = localStorage.getItem(CHAVE);
      return dados ? JSON.parse(dados) : [];
    } catch (e) {
      return [];
    }
  }

  function salvarCarrinho(itens) {
    localStorage.setItem(CHAVE, JSON.stringify(itens));
  }

  function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
  }

  function atualizarContador(itens) {
    const total = itens.reduce(function (soma, item) {
      return soma + item.quantidade;
    }, 0);
    const el = document.getElementById("cart-count");
    if (el) el.textContent = total;
  }

  function renderizar() {
    const itens = lerCarrinho();
    const lista = document.getElementById("cart-list");
    const vazio = document.getElementById("cart-empty");
    const conteudo = document.getElementById("cart-content");
    const subtotalEl = document.getElementById("cart-subtotal");

    atualizarContador(itens);

    if (itens.length === 0) {
      vazio.hidden = false;
      conteudo.hidden = true;
      return;
    }

    vazio.hidden = true;
    conteudo.hidden = false;

    let subtotal = 0;
    lista.innerHTML = "";

    itens.forEach(function (item, index) {
      const linhaTotal = item.preco * item.quantidade;
      subtotal += linhaTotal;

      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML =
        '<div class="cart-item__info">' +
        '<h2 class="cart-item__nome">' + item.nome + "</h2>" +
        '<p class="cart-item__preco">' + formatarPreco(item.preco) + " cada</p>" +
        "</div>" +
        '<div class="cart-item__qtd">' +
        '<button type="button" class="cart-item__btn" data-acao="menos" data-index="' + index + '" aria-label="Diminuir">−</button>' +
        '<span class="cart-item__num">' + item.quantidade + "</span>" +
        '<button type="button" class="cart-item__btn" data-acao="mais" data-index="' + index + '" aria-label="Aumentar">+</button>' +
        "</div>" +
        '<p class="cart-item__total">' + formatarPreco(linhaTotal) + "</p>" +
        '<button type="button" class="cart-item__remove" data-acao="remover" data-index="' + index + '" aria-label="Remover">✕</button>';

      lista.appendChild(li);
    });

    subtotalEl.textContent = formatarPreco(subtotal);
  }

  // Clique em + / − / remover
  document.getElementById("cart-list").addEventListener("click", function (e) {
    const botao = e.target.closest("[data-acao]");
    if (!botao) return;

    const acao = botao.getAttribute("data-acao");
    const index = parseInt(botao.getAttribute("data-index"), 10);
    const itens = lerCarrinho();

    if (acao === "mais") {
      itens[index].quantidade += 1;
    } else if (acao === "menos") {
      itens[index].quantidade -= 1;
      if (itens[index].quantidade <= 0) {
        itens.splice(index, 1);
      }
    } else if (acao === "remover") {
      itens.splice(index, 1);
    }

    salvarCarrinho(itens);
    renderizar();
  });

  // Limpar tudo
  document.getElementById("btn-limpar").addEventListener("click", function () {
    if (confirm("Remover todos os itens do carrinho?")) {
      salvarCarrinho([]);
      renderizar();
    }
  });

  renderizar();
});
