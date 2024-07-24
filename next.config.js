module.exports = {
  output: "export",
  reactStrictMode: true,
  webpack: (config, options) => {
      config.module.rules.push({
          test: /\.(glsl|vs|fs|vert|frag)$/,
          use: ['raw-loader'],
      });

      return config;
  }
};