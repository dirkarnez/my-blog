import * as React from "react";
import { isDataUri } from "../utils";
import { Button } from "../components";

interface DataUriToImageState {
   imgSrc: string
}

export default class DataUriToImage extends React.Component<{}, DataUriToImageState> {
   constructor(props: {}) {
      super(props);
      this.state = { imgSrc: "" };
      this.dataUriToImage = this.dataUriToImage.bind(this);
      this.promptNotURI = this.promptNotURI.bind(this);
   }

   promptNotURI() {
      alert("Not a data uri");
      return "";
   }

   dataUriToImage() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => {
            this.setState({
               imgSrc: isDataUri(text) ? text : this.promptNotURI()
            })
         })
         .catch(() => {
            this.setState({
               imgSrc: this.promptNotURI()
            })
         });
   }

   render() {
      return (
         <div>
            <Button onClick={this.dataUriToImage}>Data URI to image</Button>
            {this.state.imgSrc && <img src={this.state.imgSrc} />}
         </div>
      )
   }
}