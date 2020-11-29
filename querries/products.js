import gql from 'graphql-tag'

const PRODUCTS_QUERY_BY_CATEGORY = gql`
  query category($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      name
      products {
        edges {
          node {
            slug
            databaseId
            name
            ... on SimpleProduct {
              price
              productCategories {
                edges {
                  node {
                    slug
                  }
                }
              }
            }
            image {
              sourceUrl
            }
          }
        }
      }
    }
  }
`

const PRODUCTS_QUERY_BY_TAG = gql`
  query products($id: ID!) {
    productTag(id: $id, idType: SLUG) {
      products {
        nodes {
          databaseId
          slug
          name
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            name
            price
            description
            productCategories {
              edges {
                node {
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`

const PRODUCT_QUERY_BY_SLUG = gql`
  query product($id: ID!) {
    product(id: $id, idType: SLUG) {
      name
      image {
        sourceUrl
      }
      description
      ... on SimpleProduct {
        price
      }
      productCategories {
        edges {
          node {
            slug
          }
        }
      }
    }
  }
`

export {
  PRODUCTS_QUERY_BY_TAG,
  PRODUCTS_QUERY_BY_CATEGORY,
  PRODUCT_QUERY_BY_SLUG,
}
