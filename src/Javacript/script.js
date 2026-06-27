// ===== DARK MODE (US02) =====
const darkModeBtn = document.getElementById('darkmode');
const htmlElement = document.documentElement;

// Verificar preferência salva
if (localStorage.getItem('darkMode') === 'enabled') {
  htmlElement.classList.add('dark-mode');
  updateDarkModeButton();
}

function updateDarkModeButton() {
  if (htmlElement.classList.contains('dark-mode')) {
    darkModeBtn.textContent = 'Modo Claro';
  } else {
    darkModeBtn.textContent = 'Modo Sustentável';
  }
}

darkModeBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark-mode');
  
  if (htmlElement.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');

  } else {
    localStorage.setItem('darkMode', 'disabled');
    
  }
  updateDarkModeButton();
});

// ===== CALCULADORA DE ROI (US01) =====
function initCalculator() {
  const inputConta = document.getElementById('input-conta-atual');
  const outputEconomia = document.getElementById('output-economia');
  const sliderEconomia = document.getElementById('slider-economia');
  
  if (!inputConta || !outputEconomia) return;

  // Atualizar calculadora em tempo real
  inputConta.addEventListener('input', (e) => {
    const valor = parseFloat(e.target.value) || 0;
    
    if (valor <= 0) {
      outputEconomia.textContent = 'R$ 0,00';
      sliderEconomia.value = 0;
      return;
    }

    // Calcular 95% de economia (valor máximo com tecnologia Lumina)
    const economia = valor * 0.95;
    const nuevaContaMes = valor * 0.05; // 5% de taxa mínima

    outputEconomia.innerHTML = `
      <div class="economia-resultado">
        <div class="economia-item">
          <span>Conta Atual:</span>
          <strong>R$ ${valor.toFixed(2).replace('.', ',')}</strong>
        </div>
        <div class="economia-item">
          <span>Nova Conta:</span>
          <strong>R$ ${nuevaContaMes.toFixed(2).replace('.', ',')}</strong>
        </div>
        <div class="economia-item economia-destaque">
          <span>Economia Mensal:</span>
          <strong>R$ ${economia.toFixed(2).replace('.', ',')}</strong>
        </div>
        <div class="economia-item">
          <span>Economia Anual:</span>
          <strong>R$ ${(economia * 12).toFixed(2).replace('.', ',')}</strong>
        </div>
      </div>
    `;

    // Atualizar slider visual
    const percentualEconomia = Math.min((valor / 5000) * 100, 100);
    sliderEconomia.value = percentualEconomia;
  });

  // Atualizar input quando slider muda
  sliderEconomia.addEventListener('input', (e) => {
    const percent = e.target.value;
    const valor = (percent / 100) * 5000;
    inputConta.value = valor.toFixed(2);
    inputConta.dispatchEvent(new Event('input'));
  });
}

// ===== VALIDAÇÃO DE FORMULÁRIO (US03) =====
function initFormValidation() {
  const form = document.getElementById('main-form');
  if (!form) return;

  // Regex patterns
  const patterns = {
    nome: /^[a-záéíóúãõàâêôç\s]+$/i, // Apenas letras e espaços
    email: /^[A-Za-z0-9._-]+@[a-z]+(\.[a-z]{2,3}){1,2}$/, // Email com regex customizado
    telefone: /^\(\d{2}\)\s?9?\d{4}-\d{4}$/, // (xx) 9xxxx-xxxx ou (xx) xxxx-xxxx
    cidade: /^[a-záéíóúãõàâêôç\s-]+$/i // Letras, espaços e hífen
  };

  // Máscara de telefone
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      
      e.target.value = value;
    });
  }

  // Validação no submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cidade = document.getElementById('cidade').value.trim();

    let isValid = true;
    let mensagemErro = [];

    // Validar nome
    if (!nome) {
      mensagemErro.push('❌ Nome é obrigatório');
      isValid = false;
    } else if (!patterns.nome.test(nome)) {
      mensagemErro.push('❌ Nome deve conter apenas letras');
      isValid = false;
    }

    // Validar email
    if (!email) {
      mensagemErro.push('❌ Email é obrigatório');
      isValid = false;
    } else if (!patterns.email.test(email)) {
      mensagemErro.push('❌ Email inválido');
      isValid = false;
    }

    // Validar telefone
    if (!telefone) {
      mensagemErro.push('❌ Telefone é obrigatório');
      isValid = false;
    } else if (!patterns.telefone.test(telefone)) {
      mensagemErro.push('❌ Telefone inválido. Use: (XX) 9XXXX-XXXX');
      isValid = false;
    }

    // Validar cidade
    if (!cidade) {
      mensagemErro.push('❌ Cidade é obrigatória');
      isValid = false;
    } else if (!patterns.cidade.test(cidade)) {
      mensagemErro.push('❌ Cidade inválida');
      isValid = false;
    }

    // Mostrar resultado
    if (isValid) {
      alert(`✅ Formulário válido!\n\nObrigado ${nome}!\nNossa equipe entrará em contato em breve.`);
      form.reset();
      // Aqui você pode enviar os dados para um servidor
      console.log({ nome, email, telefone, cidade });
    } else {
      alert(mensagemErro.join('\n'));
    }
  });
}

// ===== ACORDEÃO (US04) =====
function initAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion-btn');
  
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const accordionItem = btn.closest('.accordion-item');
      const isActive = accordionItem.classList.contains('active');

      // Fechar outros itens
      document.querySelectorAll('.accordion-item.active').forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove('active');
          item.querySelector('.accordion-content').style.maxHeight = null;
        }
      });

      // Toggle item atual
      accordionItem.classList.toggle('active');
      const content = accordionItem.querySelector('.accordion-content');
      
      if (accordionItem.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}

// ===== INICIALIZAR TUDO =====
document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initFormValidation();
  initAccordion();
});

