require("dotenv").config();

module.exports = class TogetherAIAdvisor {
  constructor(context) {
    this.context = context;
  }

  async getRecommendation() {
    const { profile, settings, state } = this.context;
    const input = `
User Profile:
- Name: ${profile.name}
- Age: ${profile.age}
- Career Goal: ${profile.careerGoal}

Budget: ${settings.monthlyBudget} ${settings.currency}
Expenses: ${state.totalExpenses}
Savings: ${state.currentSavings}
Preferences: ${state.lifestylePreferences.join(", ")}

Give a short, actionable lifestyle or financial tip.
    `.trim();

    return await this.getAIRecommendation(input);
  }

  async getAIRecommendation(input) {
    try {
      const response = await fetch(
        "https://api.together.xyz/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek-ai/DeepSeek-V3",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant giving detailed personalized lifestyle and financial advice based on user profiles and preferences.",
              },
              { role: "user", content: input },
            ],
          }),
        }
      );
      const data = await response.json();
      const advice = data.choices[0].message.content.trim();
      return advice;
    } catch (error) {
      if (error.status === 429) {
        return "⚠️ You’ve exceeded your quota. Please check your TOGETHER AI plan and billing.";
      }
      console.error("TOGETHER AI API error:", error);
      return "❌ An error occurred while generating your recommendation.";
    }
  }
};
