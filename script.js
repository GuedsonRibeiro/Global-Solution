  // Código JavaScript para a comunicação com o backend
document.addEventListener('DOMContentLoaded', function() {
    // Obtenha uma referência à tabela de doações
    const donationTable = document.getElementById('donationTable');
  
    // Função para buscar os dados do banco de dados e preencher a tabela
    function fetchDonations() {
      fetch('http://107.23.247.169/api/doacao') // substitua pelo endpoint correto
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Limpar o conteúdo atual da tabela
          donationTable.innerHTML = '';
  
          // Preencher a tabela com os dados retornados
          data.forEach(function(donation) {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${donation.name}</td>
              <td>${donation.email}</td>
              <td>${donation.amount}</td>
            `;
            donationTable.appendChild(row);
          });
        })
        .catch(function(error) {
          console.log(error);
          // Trate os erros de conexão ou outros erros do lado do cliente
        });
    }
  
    // Chamada inicial para buscar e exibir as doações
    fetchDonations();
  
    // Adicione um listener de evento para o envio do formulário de doação
    const donationForm = document.getElementById('donationForm');
    donationForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita que a página seja recarregada ao enviar o formulário
  
      // Obtenha os valores do formulário
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const amount = document.getElementById('amount').value;
  
      // Aqui você pode enviar esses valores para o backend usando uma solicitação HTTP (por exemplo, usando fetch ou XMLHttpRequest)
      // Exemplo com fetch:
      fetch('http://107.23.247.169/api/doacao', {
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
            fetchDonations(); // Atualiza a tabela com as doações mais recentes
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
});