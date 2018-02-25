export default {
  port: process.env.PORT || 8080,
  conString : process.env.DATABASE_URL || 'postgres://osodhysfgbxoln:96960c4600b5332965823319c91d4f3c38029c3ec0ca1ba5363f8361dbe1a4be@ec2-79-125-117-53.eu-west-1.compute.amazonaws.com:5432/d9it2nebkl455l?ssl=true',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

