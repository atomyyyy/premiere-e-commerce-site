// https://stackoverflow.com/questions/63124432/how-do-i-configure-mini-css-extract-plugin-in-gatsby
exports.onCreateWebpackConfig = (helper) => {
  const { stage, actions, getConfig } = helper;
  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const products = await graphql(`query ProductQuery {
    allMongodbECommerceProduct(filter: {
			isActive: {
				eq: true
      }
    }) {
    edges {
        node {
          productCode
          name
          alt
          price
          colorOptions {
            color
            title
          }
          sizeOptions
          tags
          gallery {
            image
            alt
          }
          description
          image
          category
        }
      }
    }
  }`);

  products.data.allMongodbECommerceProduct.edges.map(item => item.node).forEach(product => {
    actions.createPage({
      path: `/product/${product.productCode}`,
      component: require.resolve(`./src/template/product/product.js`),
      context: product,
    })
  })
}