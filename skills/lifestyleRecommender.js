module.exports = class LifestyleRecommender {
  constructor(context) {
    this.context = context;
  }

  recommend() {
    const { careerGoal } = this.context.profile;
    const { lifestylePreferences } = this.context.state;

    const prompt = `
You are a helpful lifestyle advisor AI. Given the user's profile and lifestyle preferences, suggest a personalized recommendation.

User Profile:
- Career Goal: ${careerGoal}
- Preferences: ${lifestylePreferences.join(", ")}

Respond in one line, starting with "[LifestyleRecommender]".
    `;

    return prompt.trim();
  }
};
