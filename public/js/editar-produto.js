document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-vencimento').addEventListener('click', () => {
        const vencimentosContainer = document.getElementById('vencimentos-container');

        const newVencimentoItem = document.createElement('div');
        newVencimentoItem.classList.add('vencimento-item');

        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'date');
        inputDate.setAttribute('name', 'vencimentos[]');

        const removeButton = document.createElement('button');
        removeButton.setAttribute('type', 'button');
        removeButton.classList.add('remove-vencimento');
        removeButton.innerText = 'Remover';

        removeButton.addEventListener('click', () => {
            newVencimentoItem.remove();
        });

        newVencimentoItem.appendChild(inputDate);
        newVencimentoItem.appendChild(removeButton);

        vencimentosContainer.appendChild(newVencimentoItem);
    })
})