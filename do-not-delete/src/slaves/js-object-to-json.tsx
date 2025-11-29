import * as React from "react";
import { Button } from "../components";

export default class JsObjectToJson extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);
      this.jsObjectToJson = this.jsObjectToJson.bind(this);
   }

   async jsObjectToJson() { 
      if (!navigator.clipboard) {
         return;
      }

      try {
         var text = await navigator.clipboard.readText()
         await navigator.clipboard.writeText(eval(`JSON.stringify(${text})`))
      } catch(e) {
         alert(e)
      }
   }
   
   render() {
      return (
         <div>
            <Button onClick={this.jsObjectToJson}>Js Object To Json</Button>
         </div>
      );
   }
}