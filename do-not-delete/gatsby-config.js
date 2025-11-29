module.exports = {
    siteMetadata: {
      siteName: `Using Typescript Example`,
    },
    plugins: [
      `gatsby-plugin-typescript`,
      // {
      //   resolve: `gatsby-plugin-typography`,
      //   options: {
      //     pathToConfigModule: `src/utils/typography.js`,
      //     omitGoogleFont: true,
      //   },
      // },
      `gatsby-plugin-catch-links`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/posts`,
          name: 'posts',
        },
      },
      `gatsby-transformer-remark`,
      `gatsby-plugin-sass`
    ],
  }