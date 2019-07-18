const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const apiKey = 'xxx';
const url = 'https://gateway.watsonplatform.net/language-translator/api';
const version = '2019-07-12';

const params = {
  "text": "This phrase will be translated by ibm cloud translator service",
  "base": "en",
  "to": "pt"
};

(async () => {
  const output = await main(params);
  console.log(output);
})();

async function main(params) {
  try {
    const languageTranslator = buildTranslatorInstance();
    const result = await sendTranslateRequest(languageTranslator, params);
    return (JSON.stringify(result, null, 2));
  } catch (error) {
    const errorMessage = error.message ? error.message : error;
    return ({ error: errorMessage });
  }
};

function buildTranslatorInstance() {
  const languageTranslator = new LanguageTranslatorV3({
    version: version,
    iam_apikey: apiKey,
    url: url
  });
  return languageTranslator;
}

async function sendTranslateRequest(languageTranslator, params) {
  const { text, base, to } = params;

  const translateParams = {
    text: text,
    model_id: `${base}-${to}`,
  };

  const response = await languageTranslator.translate(translateParams);
  return response;
}
