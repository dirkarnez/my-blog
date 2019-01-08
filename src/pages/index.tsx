import * as React from "react"
import Layout from "../layouts"
import Link from "gatsby-link";
import { graphql } from 'gatsby';
// import Helmet from "react-helmet";

import '../styles/blog-listing.css';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    allMarkdownRemark : {
      edges: {
        node: {
          excerpt: string;
          id: string;
          frontmatter: {
            title: string;
            date: Date;
            path: string;
          }
        }
      }[];
    }
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;

export default (props: IndexPageProps) => {
  const { data: { allMarkdownRemark: { edges } } } = props;
  return (
    <div className="blog-posts">
      {edges.filter(edge => edge.node.frontmatter.title.length > 0)
        .map(({ node }) => {
          return (
            <div className="blog-post-preview" key={node.id}>
              <h1>
                <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
              </h1>
              <h2>{node.frontmatter.date}</h2>
              <p>{node.excerpt}</p>
            </div>
          );
        })}
    </div>
  );
}
