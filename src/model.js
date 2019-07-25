/**
 * imports and consts ...
 */

// Function params
const params = {
  param1: 'x',
  param2: 'y'
};

// Testing ...
main(params).then(output => {
  console.log(output);
});

async function main(params) {
  try {

    // Building service instance
    const instance = buildInstance();

    // Calling service method
    const result = await method(instance, params);

    // Reponse to the client in JSON format
    return (JSON.stringify(result, null, 2));

  } catch (error) {

    // Defatul error message to clients
    const errorMessage = error.message ? error.message : error;
    return ({ error: errorMessage });

  }
};

function buildInstance() {
  /**
   * Put the creation of your service here...
   */
}

async function method(serviceInstance, params) {
  /**
   * Put your service method here...
   */
}