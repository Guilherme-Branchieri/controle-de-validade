document.getElementById('add-vencimento').addEventListener('click', () => {
    const container = document.getElementById('vencimentos-container');
    const newItem = document.createElement('div');
    newItem.className = 'vencimento-item';
    newItem.innerHTML = `
      <input type="date" name="vencimentos[]">
      <button type="button" class="remove-vencimento">Remover</button>
    `;
    container.appendChild(newItem);
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-vencimento')) {
        e.target.parentElement.remove();
    }
});