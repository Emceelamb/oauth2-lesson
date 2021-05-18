const db = require('./db')

// * USED FOR DEBUGGING

const dump = function() {
	console.log('confidentialClients', db.confidentialClients);
	console.log('tokens', db.tokens);
	console.log('users', db.users);
};

/* ******************************************
 * METHODS USED FOR OBTAINING ACCESS TOKENS *
 *******************************************/

// * https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getclient

const getClient = (clientId, clientSecret) => {
  let confidentialClients = db.confidentialClients.filter((client)=>{
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

  db.tokens.push(token)
  return token
}

// * https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getuserfromclient-client-callback

const getUserFromClient = (client) => {
  // return client
  return {}
}

/* *****************************************
 * END METHODS FOR OBTAINING ACCESS TOKENS *
 ******************************************/


/* ***************************************
 * METHODS USED FOR USING ACCESS TOKENS  *
 *****************************************/

// * https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback

const getAccessToken = (accessToken) => {
  let tokens = db.tokens.filter((savedToken)=>{
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