import React from "react";
import Head from "next/head";

import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

import styles from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={props.description} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="icons/icon-128x128.png"></link>
        <link
          href="/icons/icon-128x128.png"
          rel="icon"
          type="image/png"
          sizes="128x128"
        />
        <link
          href="/icons/icon-512x512.png"
          rel="icon"
          type="image/png"
          sizes="512x512"
        />
        <title>{props.title}</title>
        <meta content="#fff" name="theme-color"/>
        <link href={props.url} rel="canonical" />
        <meta content={props.title} itemProp="name" />
        <meta content={props.description} itemProp="description" />
        <meta content={props.type} property="og:type" />
        <meta content={props.url} property="og:url" />
        <meta content={props.sitename} property="og:site_name" />
        <meta content={props.title} property="og:title" />
        <meta content={props.description} property="og:description" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@alyaliweb" />
        <meta name="twitter:title" content={props.twitterTitle ? props.twitterTitle : props.title} />
        <meta name="twitter:description" content={props.twitterDescription? props.twitterDescription : props.description} />
        <meta name="twitter:image" content={props.twitterImage && props.twitterImage} />
      </Head>

      <div className={styles.layout}>
        <Header menus={props.menus} />
        <Main>{props.children}</Main>
        <Footer latestPosts={props.latest} />
      </div>
    </>
  );
};

export default Layout;
