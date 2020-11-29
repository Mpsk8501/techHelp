import gql from 'graphql-tag'

const CATEGORY_SLUGS = gql`
  query {
    productCategories {
      nodes {
        slug
      }
    }
  }
`

const PRODUCTS_CATEGORIES_SLUGS_QUERY = gql`
  query {
    products {
      nodes {
        productCategories {
          nodes {
            slug
          }
        }
        slug
      }
    }
  }
`

export { CATEGORY_SLUGS, PRODUCTS_CATEGORIES_SLUGS_QUERY }
