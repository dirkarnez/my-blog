import * as React from "react";
import { Button } from "../components";

interface ReactClassState {
   replaced: string
}

export default class ReactClass extends React.Component<{}, ReactClassState> {
   constructor(props: {}) {
      super(props);
      this.state = { replaced: "" };
      this.replace = this.replace.bind(this);
   }

   replace() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => {
            this.setState({
               replaced: text.replace(/class[^=]*=/gmi, "className=")
            })
         })
         .catch(() => {
            this.setState({
               replaced: ""
            })
         });
   }

   render() {
      const { replaced } = this.state;
      return(
         <div>
            { replaced && <textarea>{replaced}</textarea> }
            <Button onClick={this.replace}>Convert</Button>
         </div>
      );
   }
}