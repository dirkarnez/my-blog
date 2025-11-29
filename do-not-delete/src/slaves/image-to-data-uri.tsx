import * as React from "react";
import { Button } from "../components";

interface ImageToDataUriState {
   dataUri: string
}

export default class ImageToDataUri extends React.Component<{}, ImageToDataUriState> {
   constructor(props: {}) {
      super(props);
      this.state = { dataUri: "" };
      this.imageToDataUri = this.imageToDataUri.bind(this);
   }

   imageToDataUri() {
      navigator.clipboard && navigator.clipboard
         .read()
         .then(data => console.log(data));
      // navigator.clipboard && navigator.clipboard
      //    .read()
      //    .then(data => {
      //       console.log(data);
      //       // var dataUriRegex = new RegExp(/^(data:)([\w\/\+]+);(charset=[\w-]+|base64).*,(.*)/gi);
      //       // this.setState({
      //       //    imgSrc: dataUriRegex(text) ? text : this.promptNotURI()
      //       // })
      //    })
      //    .catch(() => {
      //       // this.setState({
      //       //    imgSrc: this.promptNotURI()
      //       // })
      //    });
   }

   render() {
      return (
         <div>
            <Button onClick={this.imageToDataUri}>Image to Data URI</Button>
            {/* {this.state.imgSrc && <img src={this.state.imgSrc} />} */}
         </div>
      )
   }
}