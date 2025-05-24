module.exports = class ExpenseManager {
  constructor(context) {
    this.context = context;
  }

  addExpense(amount) {
    this.context.state.totalExpenses += amount;

    return `[ExpenseManager] Expense added: ${amount}. Total: ${this.context.state.totalExpenses}`;
  }

  checkBudget() {
    const { monthlyBudget, currency } = this.context.settings;
    const { totalExpenses } = this.context.state;

    const prompt = `
You are a smart expense-tracking assistant. The user's monthly budget is ${currency}${monthlyBudget}, and they have spent ${currency}${totalExpenses} so far. 

Based on this info, return ONE helpful sentence that gives a budget update. If they are over budget, warn them. If they’re close, caution them. If they’re under, encourage them.

Begin your response with: "[ExpenseManager] ⚠️" or "[ExpenseManager] ✅"
    `;

    return prompt.trim();
  }
};
