import * as React from "react";
import Header from "../layouts/header";
// import Helmet from "react-helmet";
import { graphql } from 'gatsby'

interface BlogTemplateProps {
  data : {
    markdownRemark: {
      frontmatter: {
        title: string
      },
      html: string
    }
  }
}
export default function ({ data }: BlogTemplateProps) {
  const { markdownRemark } = data; 
  return (
    <div className="blog-post-container">
     {/* <Helmet title={`CodeStack - ${post.frontmatter.title}`} /> */}
      <Header/>
      {/* <div className="blog-post">
        <h1>{markdownRemark.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        />
      </div> */}
      <div
        style={{
          margin: "0 auto",
          maxWidth: 980,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%"
        }}
      >
        <div
          style={{
            maxWidth: 980,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "100%",
            padding: "25px"
          }}
        >
          <div className="blog-post">
            <h1>{markdownRemark.frontmatter.title}</h1>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
;