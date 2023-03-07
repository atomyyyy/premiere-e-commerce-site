require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: `Premiere`,
    description: `Premiere - Simple with Details`,
    siteUrl: `https://effervescent-pothos-fd7859.netlify.app/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Sydney Ecommerce Theme`,
        short_name: `My Shop`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: 'src/assets/favicon.png',
      },
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        connectionString: process.env.DATABASE_CONNECTION_STRING,
        dbName: `e_commerce`,
        collection: `product`
      },
    },
    'gatsby-plugin-netlify',
  ],
};
