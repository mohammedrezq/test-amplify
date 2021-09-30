import { useQuery } from "@apollo/client";

import Image from "next/image";
import Link from "next/link";

import { initializeApollo, addApolloState } from "../services/apollo";
import InfiniteScroll from "react-infinite-scroll-component";

import { GET_POSTS } from "../lib/api/getPaginatedPostsQuery";
import { getPrimaryMenu } from "../lib/api/getMenus";
import { flatListToHierarchical } from "../lib/utils/menus";
import PostsContainer from "../components/PostsContainer";
import styles from "./articles.module.scss";
import Layout from "../components/Layout";

import SkeletonContent from "../components/SkeletonContent/SkeletonContent";
import { getSettings } from "../lib/api/getSettings";
import { getLatestPosts } from "../lib/api/getLatestPosts";

const POSTS_PER_PAGE = 6;

let $hierarchicalList = [];

const Articles = ({ menus, settings, latestPosts } = porps) => {
  const {
    data: { allSettings },
  } = settings;

  const theLatestPosts = latestPosts.data.posts;

  $hierarchicalList = flatListToHierarchical(menus?.menu?.menuItems?.nodes);
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { posts } = data;
  const havePosts = Boolean(posts.edges.length);
  const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage);



  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        first: 3,
        after: data.posts.pageInfo.endCursor,
      },
    });
  };

  if (error) {
    return <p>Sorry, an error has occurred. Please reload the page.</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.posts.edges.length) {
    return <p>No posts have been published.</p>;
  }

  return (
    <Layout
      title={allSettings.generalSettingsTitle}
      description={allSettings.generalSettingsDescription}
      sitename={allSettings.generalSettingsTitle}
      url={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/articles`}
      type={`website`}
      menus={$hierarchicalList}
      // latest={theLatestPosts}
    >
      <InfiniteScroll
        dataLength={posts.edges.length}
        next={fetchMorePosts}
        hasMore={haveMorePosts}
        loader={<SkeletonContent />}
        endMessage={null}
      >
        <PostsContainer>
          {posts.edges.map((post) => {
            const { featuredImage } = post.node;

            return (
              <div className={styles.blogContent} key={post.node.id}>
                <div className={styles.blogPostImage}>
                  <Link href={`/article/${post.node.slug}`}>
                    <a>
                      {featuredImage && (
                        <Image
                        alt={post?.featuredImage?.node?.altText ? post?.featuredImage?.node?.altText : `صورة ل${[post.node.title]}` }
                          width="350"
                          height="250"
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
                <div className={styles.blogPostGridContent}>
                  <div className={styles.blogPostCategories}>
                    {post.node?.categories &&
                      post.node?.categories?.edges.map((category, index) => {
                        return [
                          index ? " . " : " ",
                          <div
                            className={styles.blogPostCategoriesItems}
                            key={category.node.id}
                          >
                            <Link href={`/category/${category.node.slug}`}>
                              <a>{category.node.name}</a>
                            </Link>
                          </div>,
                        ];
                      })}
                  </div>
                  <div className={styles.blogPostsDescription}>
                    <div className={styles.blogPostTitle}>
                      <Link href={`/article/${post.node.slug}`}>
                        <a>
                          <h1>{post.node.title}</h1>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.blogPostExcerpt}>
                    <div
                      dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </PostsContainer>
      </InfiniteScroll>
    </Layout>
  );
};

export default Articles;

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
  });

  const { data } = await apolloClient.query({
    query: getPrimaryMenu,
  });

  const settings = await apolloClient.query({
    query: getSettings,
  });

  const latestPosts = await apolloClient.query({
    query: getLatestPosts,
  });

  return addApolloState(apolloClient, {
    props: {
      menus: data,
      settings,
      latestPosts
    },
    revalidate: 60,
  });
}
