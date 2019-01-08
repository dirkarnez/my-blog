import React from "react";
import Link from "gatsby-link";
// import Helmet from "react-helmet";

import "./index.css";
import "../styles/layout-overide.css";

const Header = () => {
  return (
    <div
      style={{
        background: "#f5f5f5",
        marginBottom: "3rem",
        borderBottom: "2px solid #e6e6e6"
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 980,
          padding: "1.45rem 1.0875rem"
        }}
      >
        <h1 style={{ margin: 0, textAlign: "center", fontSize: "18px" }}>
          <Link
            to="/"
            style={{
              color: "black",
              textDecoration: "none"
            }}
          >
            CodeStack
          </Link>
        </h1>
      </div>
    </div>
  )
};

interface SidebarPropType {
  title: string,
  description: string
}

const Sidebar = (props: SidebarPropType)  => (
  <div
    style={{
      border: "2px solid #e6e6e6",
      maxWidth: 960,
      padding: "0.5rem",
      marginBottom: "25px"
    }}
  >
    <strong>{props.title}.</strong> {props.description}
  </div>
);

interface TemplateType {
  children: Function
}

export default  ({ children } : TemplateType ) => (
  <div>
    {/* <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
    /> */}
    <Header />
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
      {/* <Media query={{ maxWidth: 848 }}>
        {matches =>
          matches ? (
            <div
              style={{
                margin: "0 auto",
                maxWidth: 980,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: "100%",
                padding: "25px"
              }}
            >
              <div style={{ flex: 1 }}>{children()}</div>
            </div>
          ) : (
            <div
              style={{
                margin: "0 auto",
                maxWidth: 980,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: "100%",
                padding: "25px"
              }}
            >
              <div style={{ flex: 2.5, paddingRight: "30px" }}>
                {children()}
              </div>

              <div style={{ flex: 1 }}>
                <Sidebar
                  title="Codestack"
                  description="Articles on React and Node.js. All articles are written by Emmanuel Yusufu, Fullstack Web Development."
                />
                <Sidebar
                  title="About author"
                  description="Emmanuel Yusufu is a Full-stack Web Developer specializing in React and Node.js based in Nigeria."
                />
              </div>
            </div>
          )
        }
      </Media> */}


      {/* <div
        style={{
          margin: "0 auto",
          maxWidth: 980,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
          padding: "25px"
        }}
      >
        <div style={{ flex: 1 }}>{children()}</div>
      </div> */}

       <div
        style={{
          margin: "0 auto",
          maxWidth: 980,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
          padding: "25px"
        }}
      >
        <div style={{ flex: 2.5, paddingRight: "30px" }}>
          {children()}
        </div>

        <div style={{ flex: 1 }}>
          <Sidebar
            title="Codestack"
            description="Articles on React and Node.js. All articles are written by Emmanuel Yusufu, Fullstack Web Development."
          />
          <Sidebar
            title="About author"
            description="Emmanuel Yusufu is a Full-stack Web Developer specializing in React and Node.js based in Nigeria."
          />
        </div>
      </div>
    </div>
  </div>
);