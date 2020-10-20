const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(price);
};

document.querySelectorAll('.price')
    .forEach(node => {
        node.textContent = toCurrency(node.textContent);
    });
/* Remove card item */
const userCard = document.getElementById('user-card');
if (userCard) {
    userCard.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const _id = event.target.dataset.id;
            /* Ajax */
            fetch(`/card/remove/${_id}`, {
                method: 'delete'
            })
                .then(response => response.json())
                .then(card => {
                    if (card.courses.length) {
                        const html = card.courses.map(val => {
                            return `
                                <tr>
                                <td>${val.title}</td>
                                <td>${val.count}</td>
                                <td><button class="btn btn-danger btn-sm remove-item" data-id="${val._id}">Удалить</button></td>
                                </tr>`;
                        }).join('');
                        userCard.querySelector('tbody').innerHTML = html;
                        userCard.querySelector('.price').textContent = toCurrency(card.total);
                    } else {
                        userCard.innerHTML = `<div class="alert alert-info">Ваша корзина пуста.</div>`;
                    }
                });
        }
    });
}