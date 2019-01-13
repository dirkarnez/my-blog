import * as React from "react";
import Link from "gatsby-link";
import Header from "./header";
// import Helmet from "react-helmet";

import "../styles/layout-overide.css";
import Sidebar from "./Sidebar";

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