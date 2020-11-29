import gql from 'graphql-tag'

const CATEGORIES_QUERY = gql`
  query {
    productCategories {
      nodes {
        databaseId
        slug
        name
        image {
          sourceUrl
        }
      }
    }
  }
`

export { CATEGORIES_QUERY }
