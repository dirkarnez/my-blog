import * as React from "react";
import { Button } from "../components";

export default class InsertScriptGenerator extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);

      this.generate = this.generate.bind(this);
   }

   generate() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => {
            alert(text.split(/\r?\n/).map(token => `INSERT INTO ${token}`).join("\n\n"));
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