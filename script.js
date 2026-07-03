let expenses = [];
let total = 0;
let chart = null;

window.onload = function () {
    let data = localStorage.getItem("expenses");
    if (data) {
        expenses = JSON.parse(data);
        render();
    }
};

function addExpense() {
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;

    if (!amount || !category) return;

    expenses.push({ amount, category });

    save();
    render();

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    save();
    render();
}

function render() {
    let table = document.getElementById("expenseTable");
    table.innerHTML = "";

    total = 0;

    expenses.forEach((e, i) => {
        total += e.amount;

        let row = table.insertRow();
        row.insertCell(0).innerText = e.amount;
        row.insertCell(1).innerText = e.category;
        row.insertCell(2).innerHTML = `<button onclick="deleteExpense(${i})">Delete</button>`;
    });

    document.getElementById("total").innerText = total;

    updateChart();
}

function save() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateChart() {
    let categories = {};

    expenses.forEach(e => {
        categories[e.category] = (categories[e.category] || 0) + e.amount;
    });

    let labels = Object.keys(categories);
    let data = Object.values(categories);

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("myChart"), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data
            }]
        }
    });
}
