import * as React from "react"
import { Button } from "../components/Button";

interface IReplaceFrom {
   fromRegex: string
}

interface StringReplacement extends IReplaceFrom {
   to: string
}

interface DataUriState {
   imgSrc: string
}

interface PlainObjectState {
   selectedLanguage?: string,
   fieldsInput: string,
   classNameInput: string
}

class DataUri extends React.Component<{}, DataUriState> {
   constructor(props: {}) {
      super(props);
      this.state = { imgSrc: '' };
      this.dataUriToImage = this.dataUriToImage.bind(this);
      this.promptNotURI = this.promptNotURI.bind(this);
   }

   promptNotURI() {
      alert("not a data uri");
      return "";
   }

   dataUriToImage() {
      navigator.clipboard && navigator.clipboard
         .readText()
         .then(text => {
            var dataUriRegex = new RegExp(/^(data:)([\w\/\+]+);(charset=[\w-]+|base64).*,(.*)/gi);
            this.setState({
               imgSrc: dataUriRegex.test(text) ? text : this.promptNotURI()
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
            <button onClick={this.dataUriToImage}>Data URI to image</button>
            {this.state.imgSrc && <img src={this.state.imgSrc} />}
         </div>
      )
   }
}

class PlainObject extends React.Component<{}, PlainObjectState> {
   constructor(props: {}) {
      super(props);
      this.state = { fieldsInput: '', classNameInput: '', selectedLanguage: '' };
      this.handleClassNameInputChange = this.handleClassNameInputChange.bind(this);
      this.handleFieldsInputChange = this.handleFieldsInputChange.bind(this);
      this.handleOptionChange = this.handleOptionChange.bind(this);
      this.plainObject = this.plainObject.bind(this);
   }

   plainObject() {
      const { fieldsInput, classNameInput, selectedLanguage } = this.state;
      var fields = fieldsInput.split(/\s*,\s*/);
      if (selectedLanguage !== "CS") {
         alert("Not supported");
      }
      const poco = `
     public class ${classNameInput}
     {
       ${!(fields.length == 1 && fields[0] == "") ? fields.map(field => `public string ${field} { get; set; }`).join("\n\n") : ""}
     }
     `
      navigator.clipboard && navigator.clipboard
         .writeText(poco)
         .then(() => console.log("Copied to clipboard successfully!"))
         .catch(() => console.error("Unable to write to clipboard. :-("));
   }
   
   handleClassNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target && event.target.value) {
         this.setState({ classNameInput: event.target.value });
      }
   }

   handleFieldsInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target && event.target.value) {
         this.setState({ fieldsInput: event.target.value });
      }
   }

   handleOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target && event.target.value) {
         this.setState({ selectedLanguage: event.target.value });
      }
   }

   render() {
      return (
         <div>
            <label>
               Generate Plain Object:
           <input
                  type="radio"
                  value="CS"
                  onChange={this.handleOptionChange}
                  checked={this.state.selectedLanguage === "CS"}
               />
               CS
           <input
                  type="radio"
                  value="GO"
                  onChange={this.handleOptionChange}
                  checked={this.state.selectedLanguage === "GO"}
               />
               Go
             <input
                  type="radio"
                  value="JAVA"
                  onChange={this.handleOptionChange}
                  checked={this.state.selectedLanguage === "JAVA"}
               />
               Java
           <input type="text" value={this.state.classNameInput} onChange={this.handleClassNameInputChange} />
               <input type="text" value={this.state.fieldsInput} onChange={this.handleFieldsInputChange} />
            </label>
            <Button onClick={this.plainObject}>Generate!</Button>
         </div>
      );
   }
}

class Replace extends React.Component<{}, {}> {
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
       </div>
      );
   }
}

export default class Slave extends React.Component<{}, {}> {
   render() {
      return (
         <div>
            {/* <DataUri />
            <br />
            <PlainObject />
            <br />
            <Replace />
            <br> */}
            <ReactClass/>
           
         </div>
      );
   }
}


interface ReactClassState {
   replaced: string
}

class ReactClass extends React.Component<{}, ReactClassState> {
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