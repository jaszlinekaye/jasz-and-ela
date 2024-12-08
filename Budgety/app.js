// Variables to track the daily expenses and budgets
let weeklyExpenses = {
    Sunday: { budget: 0, total: 0, savings: 0 },
    Monday: { budget: 0, total: 0, savings: 0 },
    Tuesday: { budget: 0, total: 0, savings: 0 },
    Wednesday: { budget: 0, total: 0, savings: 0 },
    Thursday: { budget: 0, total: 0, savings: 0 },
    Friday: { budget: 0, total: 0, savings: 0 },
    Saturday: { budget: 0, total: 0, savings: 0 }
};

let currentDay = "Sunday"; // Default starting day

// Reference to DOM elements
const budgetInput = document.getElementById("budget");
const daySelect = document.getElementById("day");
const categorySelect = document.getElementById("category");
const amountInput = document.getElementById("amount");
const addExpenseButton = document.getElementById("add-expense-btn");
const expenseList = document.getElementById("expense-list");
const totalExpensesElem = document.getElementById("total-expenses");
const currentDayElem = document.getElementById("current-day");
const weeklyExpensesTable = document.getElementById("weekly-expenses");
const totalWeekSavingsElem = document.getElementById("total-week-savings");

// Update the daily budget and expenses
function updateDashboard() {
    let totalWeekSavings = 0;
    for (let day in weeklyExpenses) {
        const expenses = weeklyExpenses[day].total;
        const budget = weeklyExpenses[day].budget;
        const savings = budget - expenses;
        weeklyExpenses[day].savings = savings;

        // Update each day's expenses and savings on the dashboard
        document.getElementById(`${day.toLowerCase()}-expenses`).innerText = `$${expenses}`;
        document.getElementById(`${day.toLowerCase()}-savings`).innerText = `$${savings}`;
        
        // Add to the total weekly savings
        totalWeekSavings += savings;
    }

    // Update total weekly savings
    totalWeekSavingsElem.innerText = `$${totalWeekSavings}`;
}

// Update the expenses list for the selected day
function updateExpenseList() {
    expenseList.innerHTML = ''; // Clear current list
    let totalExpenses = weeklyExpenses[currentDay].total;
    totalExpensesElem.innerText = totalExpenses;

    // Show expenses for the selected day
    const expenses = weeklyExpenses[currentDay].expenses || [];
    expenses.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.category}: $${item.amount}`;
        expenseList.appendChild(li);
    });
}

// Handle adding an expense
addExpenseButton.addEventListener("click", function() {
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Add the expense to the selected day
    weeklyExpenses[currentDay].total += amount;

    // Create a new expense entry for the current day
    if (!weeklyExpenses[currentDay].expenses) {
        weeklyExpenses[currentDay].expenses = [];
    }
    weeklyExpenses[currentDay].expenses.push({ category, amount });

    // Update the expense list and dashboard
    updateExpenseList();
    updateDashboard();

    // Clear the input fields
    amountInput.value = '';
});

// Handle changing the selected day
daySelect.addEventListener("change", function() {
    currentDay = daySelect.value;
    currentDayElem.innerText = currentDay;
    updateExpenseList(); // Update the list and expenses for the new day
    budgetInput.value = weeklyExpenses[currentDay].budget; // Preload the budget input
});

// Handle entering the daily budget
budgetInput.addEventListener("input", function() {
    const dailyBudget = parseFloat(budgetInput.value);
    
    if (!isNaN(dailyBudget) && dailyBudget >= 0) {
        weeklyExpenses[currentDay].budget = dailyBudget;
    }
    updateDashboard();
});

// Initialize the default view
updateDashboard();
