class BankAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount) {
        if (amount <= 0) return 'Deposit amount must be greater than zero.';
        this.transactions.push({ type: 'deposit', amount });
        this.balance += amount;
        return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    }

    withdraw(amount) {
        if (amount <= 0 || amount > this.balance) return 'Insufficient balance or invalid amount.';
        this.transactions.push({ type: 'withdraw', amount });
        this.balance -= amount;
        return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    }

    checkBalance() {
        return `Current balance: $${this.balance}`;
    }

    listAllDeposits() {
        const amounts = this.transactions
            .filter(t => t.type === 'deposit')
            .map(t => t.amount);
        return `Deposits: ${amounts.join(',')}`;
    }

    listAllWithdrawals() {
        const amounts = this.transactions
            .filter(t => t.type === 'withdraw')
            .map(t => t.amount);
        return `Withdrawals: ${amounts.join(',')}`;
    }
}

const myAccount = new BankAccount();

// Seed: 5 transactions, 3 deposits, 2 withdrawals, balance > $100
myAccount.deposit(500);
myAccount.deposit(300);
myAccount.withdraw(200);
myAccount.withdraw(100);
myAccount.deposit(150);

// --- UI helpers ---

function refreshUI() {
    document.getElementById('bank-balance').textContent = `$${myAccount.balance}`;

    const log = document.getElementById('transaction-log');
    log.innerHTML = '';
    [...myAccount.transactions].reverse().forEach((t, i) => {
        const item = document.createElement('div');
        item.className = `bank-tx bank-tx-${t.type}`;
        const num = myAccount.transactions.length - i;
        item.innerHTML = `<span class="tx-num">#${num}</span>
            <span class="tx-type">${t.type === 'deposit' ? 'Deposit' : 'Withdraw'}</span>
            <span class="tx-amount">$${t.amount}</span>`;
        log.appendChild(item);
    });

    const depositAmounts = myAccount.transactions
        .filter(t => t.type === 'deposit').map(t => `$${t.amount}`);
    const withdrawAmounts = myAccount.transactions
        .filter(t => t.type === 'withdraw').map(t => `$${t.amount}`);

    document.getElementById('deposits-list').textContent =
        depositAmounts.length ? depositAmounts.join(', ') : 'None';
    document.getElementById('withdrawals-list').textContent =
        withdrawAmounts.length ? withdrawAmounts.join(', ') : 'None';
}

function showMsg(id, text, isError) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.className = 'bank-msg ' + (isError ? 'bank-msg-error' : 'bank-msg-ok');
}

document.getElementById('deposit-btn').addEventListener('click', () => {
    const input = document.getElementById('deposit-amount');
    const amount = parseFloat(input.value);
    const msg = myAccount.deposit(amount);
    const ok = msg.startsWith('Successfully');
    showMsg('deposit-msg', msg, !ok);
    if (ok) { input.value = ''; refreshUI(); }
});

document.getElementById('withdraw-btn').addEventListener('click', () => {
    const input = document.getElementById('withdraw-amount');
    const amount = parseFloat(input.value);
    const msg = myAccount.withdraw(amount);
    const ok = msg.startsWith('Successfully');
    showMsg('withdraw-msg', msg, !ok);
    if (ok) { input.value = ''; refreshUI(); }
});

refreshUI();
