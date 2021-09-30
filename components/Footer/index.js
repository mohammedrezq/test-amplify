import React from "react";
import Link from "next/link";

import styles from "./Footer.module.scss";

const Footer = ({ latestPosts }) => {
  return (
    <>
      <div className={styles.footerContainer}>
        {latestPosts && (
          <div className={styles.latestPostsFooter}>
            {latestPosts?.edges?.length > 0 && <h2>أحدث المواضيع</h2>}
            {latestPosts?.edges.map((post, index) => {
              return (
                <div key={post.node.id}>
                  <Link href={`/blog/${post.node.slug}`}>
                    <a>{post.node.title}</a>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <div>
          Hello
        </div>
      </div>
      <div className={styles.lowerFooter}>
        جميع الحقوق محفوظة لموقع الليالي &copy; {new Date().getFullYear()}
      </div>
    </>
  );
};

export default Footer;
