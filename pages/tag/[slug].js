import { gql } from "@apollo/client";
import { getTagBySlug } from "../../lib/api/getTagBySlug";
import { initializeApollo } from "../../services/apollo";
import Image from "next/image";
import Link from "next/link";
import PostsContainer from "../../components/PostsContainer";

import styles from "../article/article.module.scss";

import tagStyles from "./tag.module.scss";

import { flatListToHierarchical } from "../../lib/utils/menus";
import { getPrimaryMenu } from "../../lib/api/getMenus";
import Layout from "../../components/Layout";

let $hierarchicalList = [];

const Tag = ({ tag, menus } = props) => {
  const { posts } = tag;

  $hierarchicalList = flatListToHierarchical(
    menus?.data?.menu?.menuItems?.nodes
  );

  return (
    <Layout
      title={`الوسم: ${tag?.name}`}
      description={`${tag?.description ? tag?.description : tag?.name}`}
      menus={$hierarchicalList}
    >
      <h1>هذه المواضيع موسومة بـ&quot;{tag.name}&quot;</h1>

      <PostsContainer>
        {posts.edges.map((post) => {
          const { featuredImage } = post?.node;

          return (
            <div className={tagStyles.blogContent} key={post.node.id}>
              <div className={tagStyles.blogPostImage}>
                <Link href={`/article/${post?.node?.slug}`}>
                  <a>
                    {featuredImage && (
                      <Image
                        alt={
                          post?.featuredImage?.node?.altText
                            ? post?.featuredImage?.node?.altText
                            : `image for: ${post.node.title}`
                        }
                        width="350"
                        height="250"
                        srcSet={featuredImage?.node?.srcSet}
                        layout="responsive"
                        src={featuredImage?.node?.sourceUrl}
                        blurDataURL={`/_next/image?url=${featuredImage?.node?.sourceUrl}&w=16&q=1`}
                        placeholder="blur"
                        loading="lazy"
                      />
                    )}
                  </a>
                </Link>
              </div>
              <Link href={`/article/${post?.node?.slug}`}>
                <a>
                  <h1>{post?.node?.title}</h1>
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

export default Tag;

export const getStaticPaths = async () => {
  const slugs = await getTagSlug();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getTagSlug = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query getTags {
        tags(first: 10000) {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return data.tags?.nodes?.map((node) => node.slug);
};

export const getStaticProps = async (context) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: getTagBySlug,
    variables: {
      slug: context?.params?.slug,
    },
  });

  const menusData = await apolloClient.query({
    query: getPrimaryMenu,
  });

  return {
    props: {
      tag: data?.tag,
      menus: menusData,
    },
    revalidate: 60,
  };
};
