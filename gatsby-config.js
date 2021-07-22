require("dotenv").config({
  path: `.env`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const auth = {}

if (process.env.ENABLE_HTTP_AUTH === "true") {
  auth.auth = {
    htaccess: {
      password: process.env.HTTPBASICAUTH_PASSWORD,
      username: process.env.HTTPBASICAUTH_USERNAME,
    },
  }
}

module.exports = {
  pathPrefix: "/wp-test",
  siteMetadata: {
    title: `Gatsby WordPress Twenty Twenty`,
    description: `Gatsby starter site for Twenty Twenty Gatsby Theme.`,
    author: `@henrikwirth`,
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-notifications`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        schema: {
           timeout: 120000
        },
        production: {
          allow404Images: true,
        },
        url: process.env.WPGRAPHQL_URL,
        verbose: true,
        ...auth,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
            showQueryVarsOnError: true,
            showQueryOnError: true,
            copyQueryOnError: true,
          },
        },
        html: {
          fallbackImageMaxWidth: 800,
        },
        // fields can be excluded globally.
        // this example is for wp-graphql-gutenberg.
        // since we can get block data on the `block` field
        // we don't need these fields
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development` ||
              process.env.BRANCH !== `master`
                ? // Lets just pull 50 posts in development or PR builds to make it easy on ourselves.
                  35
                : // And then we can pull all posts in production
                  null,
          },
          // this shows how to exclude entire types from the schema
          // this example is for wp-graphql-gutenberg
          CoreParagraphBlockAttributesV2: {
            exclude: true,
          },
          // https://github.com/gatsbyjs/gatsby/issues/29966#issuecomment-809523224
          BlockEditorContentNode: {
            exclude: true,
          },
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // See below to configure properly
        },
      },
    },
    `gatsby-plugin-transition-link`,
  ],
}
