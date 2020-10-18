document.querySelectorAll('.price')
    .forEach(node => {
        node.textContent = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'})
            .format(node.textContent);
    });