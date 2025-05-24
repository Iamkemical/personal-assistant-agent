const express = require("express");
const AppContext = require("../context/appContext");
const AIAgent = require("../agent/aiAgent");

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {
    const { profile, settings, state } = req.body;

    if (!profile || !settings || !state) {
      return res
        .status(400)
        .json({ error: "Missing profile, settings, or state." });
    }

    const context = new AppContext(profile, settings, state);
    const agent = new AIAgent(context);

    agent.logExpense(state.newExpense || 0);
    //await agent.runDailyRoutine();

    const lifestyle = agent.recommender.recommend();
    const suggestedSavings = agent.savings.suggestSavings();
    const budgetCheck = agent.expenses.checkBudget();

    const result = {
      budgetCheck: await agent.chat.getAIRecommendation(budgetCheck),
      suggestedSavings: await agent.chat.getAIRecommendation(suggestedSavings),
      lifestyle: await agent.chat.getAIRecommendation(lifestyle),
      generalAdvice: await agent.chat.getRecommendation(),
    };

    res.json(result);
  } catch (err) {
    console.error("❌ Error in agent route:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
