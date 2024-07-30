document.addEventListener('DOMContentLoaded', () => {
    const descriptionInput = document.getElementById('descriptionInput');
    const amountInput = document.getElementById('amountInput');
    const typeSelect = document.getElementById('typeSelect');
    const addTransactionButton = document.getElementById('addTransactionButton');
    const transactionList = document.getElementById('transactionList');
    const totalIncome = document.getElementById('totalIncome');
    const totalExpenses = document.getElementById('totalExpenses');
    const balance = document.getElementById('balance');
    const filters = document.querySelectorAll('.filter');

    let transactions = [];

    const updateSummary = () => {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
        const bal = income - expenses;

        totalIncome.textContent = income.toFixed(2);
        totalExpenses.textContent = expenses.toFixed(2);
        balance.textContent = bal.toFixed(2);
    };

    const renderTransactions = (filter = 'all') => {
        transactionList.innerHTML = '';
        const filteredTransactions = transactions.filter(t => filter === 'all' || t.type === filter);
        filteredTransactions.forEach(t => {
            const li = document.createElement('li');
            li.className = t.type;
            li.innerHTML = `
                ${t.description} - $${t.amount.toFixed(2)}
            `;
            transactionList.appendChild(li);
        });
    };

    const addTransaction = () => {
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());
        const type = typeSelect.value;

        if (description === '' || isNaN(amount)) return;

        transactions.push({ description, amount, type });
        descriptionInput.value = '';
        amountInput.value = '';
        renderTransactions();
        updateSummary();
    };

    addTransactionButton.addEventListener('click', addTransaction);

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterType = filter.dataset.filter;
            renderTransactions(filterType);
        });
    });

    // Initial render
    renderTransactions();
    updateSummary();
});
