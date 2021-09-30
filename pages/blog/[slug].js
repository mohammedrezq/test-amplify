import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";

import { initializeApollo } from "../../services/apollo";
import { getPostBySlug } from "../../lib/api/getPostBySlug";
import styles from "./blog.module.scss";

import { flatListToHierarchical } from "../../lib/utils/menus";
import { getPrimaryMenu } from "../../lib/api/getMenus";
import Layout from "../../components/Layout";
import { getSettings } from "../../lib/api/getSettings";
import { getRelatedPosts } from "../../lib/utils/relatedPosts";
import { getLatestPosts } from "../../lib/api/getLatestPosts";

let $hierarchicalList = [];

const Post = ({ post, menus, settings, relatedPosts, latestPosts } = props) => {
  const { title } = post;
  const { featuredImage } = post;
  const { content } = post;
  const { next } = post;
  const { previous } = post;
  const { tags } = post;
  const { categories } = post;

  const postModifiedDate = post.modified;
  const postDate = postModifiedDate.split("T")[0];

  const {
    data: { allSettings },
  } = settings;

  $hierarchicalList = flatListToHierarchical(
    menus?.data?.menu?.menuItems?.nodes
  );

  const theLatestPosts = latestPosts.data.posts;

  return (
    <Layout
      title={ post?.seo?.title? post?.seo?.title : `${title} - ${allSettings.generalSettingsTitle}`}
      description={post?.seo?.metaDesc ? post?.seo?.metaDesc : title}
      sitename={allSettings.generalSettingsTitle}
      url={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/blog/${post.slug}`}
      twitterImage={post?.seo?.twitterImage?.sourceUrl ? post?.seo?.twitterImage?.sourceUrl : featuredImage?.node?.sourceUrl}
      type={`article`}
      menus={$hierarchicalList}
      // latest={theLatestPosts}
    >
      <div className={styles.blogPostContent}>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {featuredImage && (
          <Image
            alt={
              post?.featuredImage?.node?.altText
                ? post?.featuredImage?.node?.altText
                : `ـ صورة لـ Image For ${title}`
            }
            width="350"
            height="250"
            layout="responsive"
            src={featuredImage?.node?.sourceUrl}
            blurDataURL={`/_next/image?url=${featuredImage?.node?.sourceUrl}&w=16&q=1`}
            placeholder="blur"
            loading="lazy"
          />
        )}
        <div className={styles.postHeader}>
          <div className={styles.categoryContainer}>
            {categories.edges &&
              categories.edges.map((cat, index) => {
                return [
                  index ? " . " : " ",
                  <div className={styles.postCategories} key={cat.node.id}>
                    <Link href={`/category/${cat.node.slug}`} passHref>
                      <a>
                        <div>{cat.node.name}</div>
                      </a>
                    </Link>
                  </div>,
                ];
              })}
          </div>
          <div className={styles.dateContainer}>
            آخر تحديث: 
            <span>{postDate}</span>
          </div>
        </div>
        <div
          className={styles.blogPostEditorContent}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className={styles.tagsContainer}>
          {tags.edges.length > 0 && (
            <div className={styles.tagsHead}>الوسوم: </div>
          )}
          {tags.edges &&
            tags.edges.map((tag, index) => {
              return [
                index ? " . " : " ",
                <div className={styles.postTags} key={tag.node.id}>
                  <Link href={`/tag/${tag.node.slug}`} passHref>
                    <a>{tag.node.name}</a>
                  </Link>
                </div>,
              ];
            })}
        </div>
      </div>
      <div className={styles.relatedPostsSection}>
        {relatedPosts.posts.length > 0 && (
          <>
            <h2>
              مواضيع ذات صلة بـ:{" "}
              <span dangerouslySetInnerHTML={{ __html: title }} />{" "}
            </h2>
            <div className={styles.relatedPostsContainer}>
              {relatedPosts.posts.map((post, index) => {
                return (
                  <div className={styles.relatedPost} key={post.databaseId}>
                    <Link href={`/blog/${post.slug}`} passHref>
                      <a>
                        <div className={styles.relatedPostImage}>
                          {post?.featuredImage && (
                            <Image
                              alt={
                                post?.featuredImage?.node?.altText
                                  ? post?.featuredImage?.node?.altText
                                  : `صورة ل${post.title}`
                              }
                              width="350"
                              height="250"
                              layout="responsive"
                              src={post?.featuredImage?.node?.sourceUrl}
                              blurDataURL={`/_next/image?url=${post?.featuredImage?.node?.sourceUrl}&w=16&q=1`}
                              placeholder="blur"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <h3 className={styles.relatedPostTitle}></h3>
                        {post.title}
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className={styles.postPagination}>
        {next ? (
          <>
            <Link href={`/blog/${next.slug}`}>
              <a className={styles.next}>
                <span className={styles.nextHead}>السابق: </span>
                <div className={styles.nextUrl}>
                  <span className={styles.nextIcon}>&#8594;</span>
                  <span className={styles.nextTitle}>{next.title}</span>
                </div>
              </a>
            </Link>
          </>
        ) : null}
        {previous ? (
          <>
            <Link href={`/blog/${previous.slug}`}>
              <a className={styles.previous}>
                <span className={styles.previousHead}>التالي: </span>
                <div className={styles.previousUrl}>
                  <span className={styles.previousTitle}>{previous.title}</span>
                  <span className={styles.previousIcon}>&#8592;</span>{" "}
                </div>
              </a>
            </Link>
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default Post;

export async function getStaticPaths() {
  const slugs = await getPostSlugs();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getPostSlugs() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: gql`
      query getPosts {
        posts(first: 100000) {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return data.posts?.nodes?.map((node) => node.slug);
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: getPostBySlug,
    variables: {
      slug: context?.params?.slug,
    },
  });

  const category =
    data.post.categories.edges.length > 0 && data.post.categories.edges[0];
  const postId = data.post.databaseId;

  const menusData = await apolloClient.query({
    query: getPrimaryMenu,
  });

  const settings = await apolloClient.query({
    query: getSettings,
  });

  const latestPosts = await apolloClient.query({
    query: getLatestPosts,
  });

  return {
    props: {
      post: data?.post,
      menus: menusData,
      settings,
      relatedPosts: {
        posts: await getRelatedPosts(category, postId),
      },
      latestPosts
    },
    revalidate: 60,
  };
}
