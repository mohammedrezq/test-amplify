import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

import { getCategoryBySlug } from "../../lib/api/getCategoryBySlug";
import { initializeApollo } from "../../services/apollo";
import { getPrimaryMenu } from "../../lib/api/getMenus";

import PostsContainer from "../../components/PostsContainer";
import Layout from "../../components/Layout";

import styles from "../article/article.module.scss";
import categoryStyles from "./category.module.scss";
import { flatListToHierarchical } from "../../lib/utils/menus";

let $hierarchicalList = [];

const Category = ({ category, menus } = props) => {
  const { posts } = category;

  $hierarchicalList = flatListToHierarchical(
    menus?.data?.menu?.menuItems?.nodes
  );

  return (
    <Layout
      title={`${category.name}`}
      description={`${
        category?.description ? category?.description : category?.name
      }`}
      menus={$hierarchicalList}
    >
      <h1 className={categoryStyles.categoryHeader}>{category.name}</h1>
      {category?.description && (
        <div className={categoryStyles.categoryDescription}>
          {category?.description}
        </div>
      )}
      <PostsContainer>
        {posts.edges.map((post) => {
          const { featuredImage } = post.node;

          return (
            <div className={categoryStyles.blogContent} key={post?.node?.id}>
              <div className={categoryStyles.blogPostImage}>
                <Link href={`/article/${post?.node?.slug}`}>
                  <a>
                    {featuredImage && (
                      <img
                        alt={
                          post?.featuredImage?.node?.altText
                            ? post?.featuredImage?.node?.altText
                            : `صورة ل${post.node.title}`
                        }
                        src={featuredImage?.node?.sourceUrl}
                        srcSet={featuredImage?.node?.srcSet}
                        loading="lazy"
                      />
                    )}
                  </a>
                </Link>
              </div>
              <Link href={`/article/${post?.node?.slug}`}>
                <a>
                  <h1>{post.node.title}</h1>
                </a>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: post?.node?.excerpt }} />
            </div>
          );
        })}
      </PostsContainer>
    </Layout>
  );
};

export default Category;

export const getStaticPaths = async () => {
  const slugs = await getCategorySlug();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getCategorySlug = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query getCategories {
        categories(first: 10000) {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return data.categories?.nodes?.map((node) => node.slug);
};

export const getStaticProps = async (context) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: getCategoryBySlug,
    variables: {
      slug: context?.params?.slug,
    },
  });

  const menusData = await apolloClient.query({
    query: getPrimaryMenu,
  });

  return {
    props: {
      category: data?.category,
      menus: menusData,
    },
    revalidate: 60,
  };
};
