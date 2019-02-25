import * as React from "react";
import traverse from "traverse";
import { Button } from "../components";
// var obj = {
//    a: "a1",
//    b: [1, 2, 3],
//    C: {
//       CA: [3, 4, 5],
//       D: "p"
//    }
// }

interface TraverseState {
   images: string[]
}

export default class Traverse extends React.Component<{}, TraverseState> {
   constructor(props: {}) {
      super(props);
      this.state = {
         images: []
      }

      this.traverseForDataURI = this.traverseForDataURI.bind(this);
   }

   traverseForDataURI() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => new Promise((resolve, reject) => {
            try { resolve(JSON.parse(text)); } catch(e) { reject(e); }
         }))
         .then(parsed => {
            traverse(parsed).forEach(function (x) {
               if (!Array.isArray(x) && Object.prototype.toString.call(x) != "[object Object]") {
                  console.log(x);
                  console.log(this.path)
               }
            });
         })
         .catch(() => {
            this.setState({
               images: []
            })
         });
   }

   render() {
      return (
         <div>
            <Button onClick={this.traverseForDataURI}></Button>
         </div>
      )
   }
}