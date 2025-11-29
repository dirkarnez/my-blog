import * as React from "react";
import { Button } from "../components";
import { StringReplacement } from "./replacement";

interface BatMakerState {
   commands: string[]
}

export default class BatMaker extends React.Component<{}, BatMakerState> {
   constructor(props: {}) {
      super(props);
      this.state = { commands: [] };
      this.createBatchScript = this.createBatchScript.bind(this);
      this.template = this.template.bind(this);
      this.replace = this.replace.bind(this);
   }

   template(token: string): string {
      return this.replace("if not exist {0} ( mkdir {0} )", { fromRegex: "\\{0\\}", to: `"${token}"` });
   }

   replace(str: string, ...replacements: StringReplacement[]): string {
      for (var i = 0; i < replacements.length; i++) {
         str = str.replace(new RegExp(replacements[i].fromRegex, 'g'), replacements[i].to); 
      }
      return str;
   }
   
   createBatchScript() {
      navigator.clipboard && navigator.clipboard
      .readText()
      .then(text => {
         this.setState({
            commands: text.split(/\r?\n/).filter(token => token).map(token => this.template(token))
         });
      })
      .catch(() => {
         this.setState({
            commands: []
         })
      });
   }


   render() {
      const { commands } = this.state;
      return (
         <div>
            <Button onClick={this.createBatchScript}>Create from clipboard</Button>
            { commands && commands.length > 0 && <a download="script.bat" href={`data:text/html,${commands.join("\n")}`}>Download</a> }
         </div>
      );
   }
}