let config = {
  confidentialClients: [{
    clientId: 'secretapplication',
    clientSecret: 'topsecret',
    grants: [
      'client_credentials'
    ],
    redirectUris: []
  }],
  tokens:[]
}

// * USED FOR DEBUGGING

var dump = function() {
	console.log('clients', config.clients);
	console.log('confidentialClients', config.confidentialClients);
	console.log('tokens', config.tokens);
	console.log('users', config.users);
};

/* ******************************************
 * METHODS USED FOR OBTAINING ACCESS TOKENS *
 *******************************************/

// * https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getclient

const getClient = (clientId, clientSecret) => {
  let confidentialClients = config.confidentialClients.filter((client)=>{
    return client.clientId === clientId && client.clientSecret === clientSecret
  })
  return confidentialClients[0]
}

// * https://oauth2-server.readthedocs.io/en/latest/model/spec.html#savetoken-token-client-user-callback

const saveToken = (token, client, user) => {
  token.client = {
    id: client.clientId
  }
  token.user = {
    username: user.username
  }

  config.tokens.push(token)
  return token
}

// * https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getuserfromclient-client-callback

const getUserFromClient = (client) => {
  let clients = config.confidentialClients.filter((savedClient)=>{
    return savedClient.clientId === client.clientId && savedClient.clientSecret === client.clientSecret
  })
  return clients.length
}

/* *****************************************
 * END METHODS FOR OBTAINING ACCESS TOKENS *
 ******************************************/


/* ***************************************
 * METHODS USED FOR USING ACCESS TOKENS  *
 *****************************************/

// * https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback

const getAccessToken = (accessToken) => {
  let tokens = config.tokens.filter((savedToken)=>{
    return savedToken.accessToken === accessToken
  })
  return tokens[0]
}

/* *****************************************
 * END METHODS FOR USING ACCESS TOKENS     *
 ******************************************/

module.exports = {
  // USING ACCESS TOKEN
  getAccessToken: getAccessToken,
  // OBTAINING ACCESS TOKEN
  getClient: getClient,
  getUserFromClient: getUserFromClient,
  saveToken: saveToken
}