module.exports = class SavingsAdvisor {
  constructor(context) {
    this.context = context;
  }

  suggestSavings() {
    const { monthlyBudget, currency } = this.context.settings;
    const { totalExpenses } = this.context.state;

    const prompt = `
You are a friendly financial advisor. The user has a monthly budget of ${currency}${monthlyBudget} and has already spent ${currency}${totalExpenses}. Based on this, suggest a savings recommendation in one helpful sentence. Include the currency symbol and start the message with: "[SavingsAdvisor] 💡"
    `;

    return prompt.trim();
  }
};
