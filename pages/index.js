import { initializeApollo } from "../services/apollo";
import { getPrimaryMenu } from "../lib/api/getMenus";
import Layout from "../components/Layout";
import { flatListToHierarchical } from "../lib/utils/menus";
import { getLatestPosts } from "../lib/api/getLatestPosts";

let $hierarchicalList = [];

export default function Home({ menus, latestPosts } = porps) {
  const theLatestPosts = latestPosts.data.posts;
  $hierarchicalList = flatListToHierarchical(menus?.menu?.menuItems?.nodes);
  return (
    <Layout menus={$hierarchicalList} latest={theLatestPosts}>
      <div>
        <h1>Home Page</h1>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: getPrimaryMenu,
  });

  const latestPosts = await apolloClient.query({
    query: getLatestPosts,
  });

  return {
    props: {
      menus: data,
      latestPosts
    },
    revalidate: 60,
  };
}
