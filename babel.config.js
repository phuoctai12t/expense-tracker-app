module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            api: './src/api',
            assets: './src/assets',
            components: './src/components',
            constant: './src/constant',
            helpers: './src/helpers',
            hooks: './src/hooks',
            navigation: './src/navigation',
            screens: './src/screens',
            store: './src/store',
            typings: './src/typings',
          },
        },
      ],
    ],
  }
}
