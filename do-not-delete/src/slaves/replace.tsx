import * as React from "react";
import { Button } from "../components";
import { StringReplacement } from "./replacement";

export default class Replace extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);
      this.replace = this.replace.bind(this);
   }

   replace(str: string, ...replacements: StringReplacement[]): string {
      for (var i = 0; i < replacements.length; i++) {
         str = str.replace(new RegExp(replacements[i].fromRegex, 'g'), replacements[i].to);
      }
      return str;
   }

   render() {
      return (
         <div>
            Textual Generation By template in clipboard
            <Button/>
         </div>
      );
   }
}