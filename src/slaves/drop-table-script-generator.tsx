import * as React from "react";
import { Button } from "../components";

export default class DropTableScriptGenerator extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);

      this.generate = this.generate.bind(this);
   }

   generate() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => {
            if (!text) {
               return;
            }
            var matches = text.match(/CREATE\s+TABLE\s+[^(\s]+/g);
            
            if (matches) {
               return navigator.clipboard && navigator.clipboard
                  .writeText(`${matches.map(match => match.replace(/create/gi, "DROP")).join(";\n\n")};`)
            } else {
               throw new Error("Not Match");
            }
         })
         .then(() => {
            alert("done");
         })
         .catch(err => {
            alert(err);
         })
   }

   render() {
      return (
         <div>
            <Button onClick={this.generate}>Generate</Button>
         </div>
      );
   }
}