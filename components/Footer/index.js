import React from "react";
import Link from "next/link";

import styles from "./Footer.module.scss";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

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
        <div className={styles.socialMedia}>
          <h2>
            التواصل معنا
          </h2>
          <div className={styles.socialContainer}>
            <span className={styles.socialIcon}><a href="https://www.google.com"><FaTwitter size={25} /></a></span>
            <span className={styles.socialIcon}><a href="https://www.google.com"><FaFacebookF size={25} /></a></span>
            <span className={styles.socialIcon}><a href="https://www.google.com"><GrInstagram size={25} /></a></span>
          </div>
        </div>
      </div>
      <div className={styles.lowerFooter}>
        جميع الحقوق محفوظة لموقع الليالي &copy; {new Date().getFullYear()}
      </div>
    </>
  );
};

export default Footer;
