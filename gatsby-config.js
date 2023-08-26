module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Montserrat`,
                variants: [`300`, `400`, `500`, `700`],
                subsets: [`cyrillic`],
              },
            ],
          },
        },
      },
    },
    "gatsby-plugin-netlify",
  ],
};
