document.addEventListener('DOMContentLoaded', function() {
  // Obtenha uma referência ao formulário de doação
  const donationForm = document.querySelector('form');

  // Adicione um listener de evento para o envio do formulário
  donationForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página seja recarregada ao enviar o formulário

    // Obtenha os valores do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;

    // Envia esses valores para o backend usando uma solicitação HTTP com fetch
    fetch('http://54.80.68.60/api/doacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, amount: amount })
    })
    .then(function(response) {
      // Verifique a resposta do backend e tome as ações apropriadas
      if (response.ok) {
        // A doação foi bem-sucedida
        alert('Obrigado pela sua doação!');
        donationForm.reset(); // Limpa os campos do formulário
      } else {
        // A doação falhou
        alert('Ocorreu um erro ao processar a sua doação. Por favor, tente novamente mais tarde.');
      }
    })
    .catch(function(error) {
      console.log(error);
      // Trate os erros de conexão ou outros erros do lado do cliente
      alert('Ocorreu um erro ao processar a sua doação. Por favor, tente novamente mais tarde.');
    });
  });

  // Envia uma solicitação GET para recuperar todas as doações
  fetch('http://54.80.68.60/api/doacoes')
  .then(function(response) {
    return response.json();
  })
  .then(function(doacoes) {
    const doacoesTable = document.getElementById('doacoesTable');

    doacoes.forEach(function(doacao) {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = doacao.nome;
      row.appendChild(nameCell);

      const amountCell = document.createElement('td');
      amountCell.textContent = doacao.amount;
      row.appendChild(amountCell);

      doacoesTable.appendChild(row);
    });
  })
  .catch(function(error) {
    console.log(error);
  });
});
