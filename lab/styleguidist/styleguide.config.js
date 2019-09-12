const path = require('path');
const glob = require('glob');

module.exports = {
  title: 'Datalayer Datalab Guide Example',
  defaultExample: false,
  components: function () {
    return glob.sync(path.resolve(__dirname, 'src/components/**/*.tsx'))
      .filter(function (module) {
        return /\/[A-Z]\w*\.tsx$/.test(module);
      });
  },
  styleguideComponents: {
    LogoRenderer: path.join(
      __dirname,
      "src",
      "logo.tsx"
    )
  },
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: require('react-docgen-typescript').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse
};
