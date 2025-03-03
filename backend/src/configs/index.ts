export const configs = {
  jwtSecret: process.env.JWT_SECRET ?? "grtdyfkuhgjtrsgzdxfhkhujtxcgyjkvhujrtxdyfcgyjkh7854",
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: process.env.PORT ?? 3000,
  mongodbUri: process.env.MONGODB_URI ?? "",
  groqApiKey: process.env.GROQ_API_KEY ?? "",
};
