import * as React from "react";
import { Button } from "../components";

export default class DatabasePlainObjectGenerator extends React.Component<{}, {}> {
   constructor(props: {}) {
      super(props);
      this.generate = this.generate.bind(this);
      this.toJavaType = this.toJavaType.bind(this);
      this.toCamel = this.toCamel.bind(this);
   }

   generate() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => {
            var jsClass = `public class Entity {\n${text.split(/\r?\n/).map(token => token.match(/([^\s]+)\s+(.*)/)).map(match => match ? `\tprivate ${this.toJavaType(match[2])} ${this.toCamel(match[1])}` : "").join(";\n")};\n}`;
            return navigator.clipboard && navigator.clipboard
               .writeText(jsClass);
         })
         .then(() => {
            alert("done");
         })
         .catch(err => {
            alert(err);
         });
   }

   toCamel(s: string) {
      return s.toLowerCase().replace(/(\_\w)/g, m => m[1].toUpperCase());
   }

   toJavaType(s: string) {
      if (!s) {
         return "";
      }

      if (s.match(/varchar/gi) != null) {
         return "String";
      } else if (s.match(/number/gi) != null){
         return "Decimal";
      } else if (s.match(/date/gi) != null) {
         return "Date";
      } else if (s.match(/timestamp/gi) != null) {
         return "Timestamp";
      } else {
         return "Integer";
      }
   }

   render() {
      return (
         <div>
            <Button onClick={this.generate}>Generate</Button>
         </div>
      )
   }
}