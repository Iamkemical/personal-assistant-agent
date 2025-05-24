const ExpenseManager = require("../skills/expenseManager");
const SavingsAdvisor = require("../skills/savingsAdvisor");
const LifestyleRecommender = require("../skills/lifestyleRecommender");
const TogetherAIAdvisor = require("./togetherAIAdvisor");

module.exports = class AIAgent {
  constructor(context) {
    this.expenses = new ExpenseManager(context);
    this.savings = new SavingsAdvisor(context);
    this.recommender = new LifestyleRecommender(context);
    this.chat = new TogetherAIAdvisor(context);
  }

  logExpense(amount) {
    this.expenses.addExpense(amount);
  }

  async runDailyRoutine() {
    console.log("\n🧠 Running your personalized assistant routine...");
    this.expenses.checkBudget();
    this.savings.suggestSavings();
    this.recommender.recommend();
    await this.chat.getRecommendation();
  }
};
