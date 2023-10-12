module.exports = function override(config, env) {
  // Add a fallback for the 'querystring' module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    querystring: require.resolve("querystring-es3"),
  };

  return config;
};
