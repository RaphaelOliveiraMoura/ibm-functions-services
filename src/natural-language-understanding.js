const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const apiKey = 'xxx';
const url = 'https://gateway.watsonplatform.net/natural-language-understanding/api';
const version = '2019-07-12';

const params = {
  "analyzeParams": {
    "url": "https://globoesporte.globo.com/futebol/",
    "features": {
      "categories": {
        "limit": 3
      }
    }
  }
};

main(params).then(output => {
  console.log(output);
});

async function main(params) {
  try {
    const naturalLanguageUnderstanding = buildNaturalLanguageUnderstandingInstance();
    const result = await sendAnalyseRequest(naturalLanguageUnderstanding, params);
    return (JSON.stringify(result, null, 2));
  } catch (error) {
    const errorMessage = error.message ? error.message : error;
    return ({ error: errorMessage });
  }
};

function buildNaturalLanguageUnderstandingInstance() {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: version,
    iam_apikey: apiKey,
    url: url
  });
  return naturalLanguageUnderstanding;
}

async function sendAnalyseRequest(naturalLanguageUnderstanding, params) {
  const { analyzeParams } = params;
  const response = await naturalLanguageUnderstanding.analyze(analyzeParams);
  return response;
}
