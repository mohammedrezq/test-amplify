import { gql } from "@apollo/client";

export const getLatestPosts = gql`
  query LatestPosts {
    posts(first: 5) {
      edges {
        node {
          id
          title
          modified
          databaseId
          slug
        }
      }
    }
  }
`;
