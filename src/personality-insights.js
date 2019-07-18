const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const apiKey = 'xxx';
const url = 'https://gateway.watsonplatform.net/personality-insights/api';
const version = '2019-07-12';

const params = {
  "profileParams": {
    "content": require('../assets/profiles.json'),
    "content_type": 'application/json',
    "consumption_preferences": true,
    "raw_scores": true,
  }
};

(async () => {
  const output = await main(params);
  console.log(output);
})();

async function main(params) {
  try {
    const personalityInsights = buildpersonalityInsightsInstance();
    const result = await sendAnalyseRequest(personalityInsights, params);
    return (JSON.stringify(result, null, 2));
  } catch (error) {
    const errorMessage = error.message ? error.message : error;
    return ({ error: errorMessage });
  }
};

function buildpersonalityInsightsInstance() {
  const personalityInsights = new PersonalityInsightsV3({
    version: version,
    iam_apikey: apiKey,
    url: url
  });
  return personalityInsights;
}

async function sendAnalyseRequest(personalityInsights, params) {
  const { profileParams } = params;
  const response = await personalityInsights.profile(profileParams);
  return response;
}
