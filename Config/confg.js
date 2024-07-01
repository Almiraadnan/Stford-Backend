const JWTSecret = "KaLM0IKjDfsWeAVbmIo2JsL3HmTlKleqq";
const mongoDB =
  "mongodb+srv://kashan:kashan@cluster0.pczwun4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 4000;

module.exports = {
  JWTSecret,
  mongoDB,
  PORT,
};
