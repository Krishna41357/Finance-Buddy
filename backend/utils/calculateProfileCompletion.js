export const calculateProfileCompletion = (profile) => {
  if (!profile) return 0;

  const fields = [
    'ageGroup',
    'experienceLevel',
    'annualIncome',
    'monthlyExpenses',
    'riskTolerance',
    'financialGoals'
  ];

  let filled = 0;

  for (const field of fields) {
    if (field === 'financialGoals') {
      if (Array.isArray(profile.financialGoals) && profile.financialGoals.length > 0) {
        filled++;
      }
    } else if (profile[field] !== undefined && profile[field] !== null) {
      filled++;
    }
  }

  return Math.round((filled / fields.length) * 100);
};
