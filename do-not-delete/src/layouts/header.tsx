import * as React from "react";
import Link from "gatsby-link";

// export default () => {
//    return (
//      <div
//        style={{
//          background: "#f5f5f5",
//          marginBottom: "3rem",
//          borderBottom: "2px solid #e6e6e6"
//        }}
//      >
//        <div
//          style={{
//            margin: "0 auto",
//            maxWidth: 980,
//            padding: "1.45rem 1.0875rem"
//          }}
//        >
//          <h1 style={{ margin: 0, textAlign: "center", fontSize: "18px" }}>
//            <Link
//              to="/"
//              style={{
//                color: "black",
//                textDecoration: "none"
//              }}
//            >
//              Dirk Arnez
//            </Link>
//          </h1>
//        </div>
//      </div>
//    )
//  };
interface HeaderProps {
  toggle: () => void
}

export default class Header extends React.Component<HeaderProps, {}> {
  render() {
    const { toggle } = this.props;
    return (
      <header className="blog-header container-fluid">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            {/* <a className="text-muted" href="#">Subscribe</a> */}
            <span style={{fontSize: "30px", cursor: "pointer"}} onClick={toggle}>&#9776;</span>
          </div>
          <div className="col-4 text-center">
            <Link className="blog-header-logo text-dark" to="/">Alex Chan</Link>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <a className="text-muted" href="#">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-3" focusable="false" role="img"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg> */}
            </a>
            <a className="btn btn-sm btn-outline-secondary" href="#">Sign up</a>
          </div>
        </div>
      </header>
    );
  }
}