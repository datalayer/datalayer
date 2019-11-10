module.exports = function injectComponent() {
  const componentsToAdd = [
    {
      area: "BottomRight",
      key: "Foo",
      mainComponent: require("./Foo").default
    }
  ];

  this.setComponents("page", componentsToAdd);
  this.setComponents("other", componentsToAdd);
};
