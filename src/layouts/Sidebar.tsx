import * as React from "react";

interface SidebarPropType {
   title: string,
   description: string
}
 
export default (props: SidebarPropType)  => (
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