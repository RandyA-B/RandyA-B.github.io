const poll = new Map();

function addOption(option) {
    if (!option) return 'Option cannot be empty.';
    if (poll.has(option)) return `Option "${option}" already exists.`;
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
}

function vote(option, voterId) {
    if (!poll.has(option)) return `Option "${option}" does not exist.`;
    const voters = poll.get(option);
    if (voters.has(voterId)) return `Voter ${voterId} has already voted for "${option}".`;
    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
}

function displayResults() {
    let result = 'Poll Results:\n';
    for (const [option, voters] of poll) {
        result += `${option}: ${voters.size} votes\n`;
    }
    return result;
}

// Seed: at least 3 options and 3 votes
addOption('Panther Pride');
addOption('Niner Nation');
addOption('Charlotte Strong');
vote('Panther Pride', 'voter001');
vote('Panther Pride', 'voter002');
vote('Niner Nation', 'voter003');

// --- UI helpers ---

function refreshSelect() {
    const select = document.getElementById('vote-select');
    select.innerHTML = '';
    for (const option of poll.keys()) {
        const el = document.createElement('option');
        el.value = option;
        el.textContent = option;
        select.appendChild(el);
    }
}

function refreshResults() {
    const total = [...poll.values()].reduce((sum, s) => sum + s.size, 0);
    const container = document.getElementById('results-display');
    container.innerHTML = '';

    for (const [option, voters] of poll) {
        const count = voters.size;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;

        const row = document.createElement('div');
        row.className = 'result-row';
        row.innerHTML = `
            <div class="result-label">
                <span class="result-name">${option}</span>
                <span class="result-count">${count} vote${count !== 1 ? 's' : ''}</span>
            </div>
            <div class="result-bar-bg">
                <div class="result-bar" style="width:${pct}%"></div>
            </div>`;
        container.appendChild(row);
    }

    if (poll.size === 0) {
        container.textContent = 'No options yet.';
    }
}

function showMsg(id, text, isError) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.className = 'voting-msg ' + (isError ? 'voting-msg-error' : 'voting-msg-ok');
}

document.getElementById('add-option-btn').addEventListener('click', () => {
    const input = document.getElementById('new-option');
    const msg = addOption(input.value.trim());
    const isError = msg !== `Option "${input.value.trim()}" added to the poll.`;
    showMsg('add-msg', msg, isError);
    if (!isError) {
        input.value = '';
        refreshSelect();
        refreshResults();
    }
});

document.getElementById('vote-btn').addEventListener('click', () => {
    const voterId = document.getElementById('voter-id').value.trim();
    const option = document.getElementById('vote-select').value;
    if (!voterId) { showMsg('vote-msg', 'Voter ID cannot be empty.', true); return; }
    const msg = vote(option, voterId);
    const isError = !msg.startsWith('Voter') || msg.includes('already voted');
    showMsg('vote-msg', msg, isError);
    refreshResults();
});

refreshSelect();
refreshResults();
