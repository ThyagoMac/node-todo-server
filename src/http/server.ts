import fastify from "fastify";

const app = fastify();

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("http server running in port 3333;");
  });

//postgresql://maindb_owner:Wx2qa8eVTgUE@ep-floral-water-a58l88dr.us-east-2.aws.neon.tech/maindb?sslmode=require
