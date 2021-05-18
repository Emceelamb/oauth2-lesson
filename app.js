const express = require('express')
const path = require('path')
const app = express();

const OAuth2Server = require('oauth2-server')

// TODO: LEARNER TO WRITE
app.oauth = new OAuth2Server({
  model: require('./model'),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true
})
// TODO -------------------

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 3000

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/home.html'))
})
app.get('/login', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/login.html'))
})

app.get('/secret', authenticateRequest, (req, res)=>{
  res.send('Welcome to the secret area.')
})

// TODO: LEARNER TO WRITE
app.all('/auth', obtainToken)

// TODO END ----------------


app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))


// TODO: LEARNER TO WRITE

// * REQUEST TOKEN
// * https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html#token-request-response-options-callback

function obtainToken(req, res) {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res)

  return app.oauth.token(request, response)
		.then((token) => {
			res.json(token);
		}).catch((err) => {
			res.status(err.code || 500).json(err);
		});
}

// * AUTHENTICATING TOKEN
// * https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html#authenticate-request-response-options-callback

function authenticateRequest(req, res, next) {

  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res)

  return app.oauth.authenticate(request, response)
    .then((token)=>{
      next()
    })
    .catch((err) => {
      res.sendFile(path.join(__dirname, 'public/error.html'))
    })
}
// TODO END ----------------