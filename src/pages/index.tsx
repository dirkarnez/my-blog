import * as React from "react"
import Layout from "../layouts"
import Link from "gatsby-link";
import { graphql } from 'gatsby';
// import Helmet from "react-helmet";
import '../scss/getstrap.scss';
import '../styles/blog-listing.css';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    allMarkdownRemark: {
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


export default class IndexPage extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps) {
    super(props);
  }

  render() {
    const { data: { allMarkdownRemark: { edges } } } = this.props;

    return (
      <Layout>
        <div className="jumbotron p-3 p-md-5 text-white bg-dark">
          <div className="col-md-6 px-0">
            <h1 className="display-4 font-italic">Title of a longer featured blog post</h1>
            <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
            <p className="lead mb-0"><a href="#" className="text-white font-weight-bold">Continue reading...</a></p>
          </div>
        </div>
        <div className="row mb-2">
          {
            edges
            .filter(edge => edge.node.frontmatter.title.length > 0)
            .map(({ node }) => (
              <div key={node.id} className="col-md-6">
                <div className="card flex-md-row mb-4 shadow-sm h-md-250">
                  <div className="card-body d-flex flex-column align-items-start">
                    <strong className="d-inline-block mb-2 text-primary">World</strong>
                    <h3 className="mb-0">
                      {node.frontmatter.title}
                    </h3>
                    <div className="mb-1 text-muted">{node.frontmatter.date}</div>
                    <p className="card-text mb-auto">{node.excerpt}</p>
                    <Link to={node.frontmatter.path}>Continue reading</Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </Layout>
    );
  }
}