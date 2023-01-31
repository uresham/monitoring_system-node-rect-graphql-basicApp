const express = require('express');
const bodyParser = require('body-parser');
const { createServer }= require('node:http');
const { WebSocketServer }= require('ws');
const { useServer }= require('graphql-ws/lib/use/ws');
const { createSchema, createYoga, createPubSub }= require('graphql-yoga');
const {typeDefs, graphqlSchema} = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const pubsub = createPubSub();

require('./config/database');
const router = require('./routes');

const app = express();

 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
 
app.use(bodyParser.json());
app.use("/",router);

const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: graphqlResolver
});


const yogaApp = createYoga({
  schema,
  graphiql: {
    // Use WebSockets in GraphiQL
    subscriptionsProtocol: 'WS'
  },
  context: { pubsub },
})

// Get NodeJS Server from Yoga..
const httpServer = createServer(yogaApp)
// Create WebSocket server instance from our Node server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions'
})


// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer(
  {
    schema: graphqlSchema,
    context: { pubsub },
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yogaApp.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })
 
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        // contextValue: await contextFactory(),
        rootValue: {
          subscribe
        }
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    }
  },
  wsServer
)

httpServer.listen(4001, () => {
   console.log('Listening on port 4001');
 
});

module.exports = app;