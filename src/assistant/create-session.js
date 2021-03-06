const AssistantV2 = require('ibm-watson/assistant/v2');
const url = 'https://gateway.watsonplatform.net/assistant/api';
const iam_apikey = 'xxx';
const version = '2019-02-28';
const assistant_id = 'xxx';

main().then(output => {
  console.log(output);
});

async function main(params) {
  try {
    const assistantInstance = buildAssistantInstance();
    const result = await createSession(assistantInstance);
    return (JSON.stringify(result, null, 2));
  } catch (error) {
    const errorMessage = error.message ? error.message : error;
    return ({ error: errorMessage });
  }
};

function buildAssistantInstance() {
  const assistantInstance = new AssistantV2({
    version,
    iam_apikey,
    url
  });
  return assistantInstance;
}

async function createSession(assistantInstance) {
  const response = await assistantInstance.createSession({
    assistant_id: assistant_id
  });
  return response;
}