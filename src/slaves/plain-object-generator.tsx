import * as React from "react";
import { Button } from "../components";

interface PlainObjectState {
  selectedLanguage?: string;
  fieldsInput: string;
  classNameInput: string;
}

enum Language {
  GO = "GO",
  JAVA = "JAVA",
  CSHARP = "CSHARP"
}

interface CodeGenList {
  name: string,
  language: Language
}

const codeGenList: CodeGenList[] = [
  { name: "Go", language: Language.GO },
  { name: "Java", language: Language.JAVA },
  { name: "C#", language: Language.CSHARP }
]

export default class PlainObjectGenerator extends React.Component<{}, PlainObjectState> {
  constructor(props: {}) {
    super(props);
    
    this.state = { fieldsInput: "", classNameInput: "", selectedLanguage: "" };

    this.handleClassNameInputChange = this.handleClassNameInputChange.bind(this);
    this.handleFieldsInputChange = this.handleFieldsInputChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.plainObject = this.plainObject.bind(this);
  }

  cSharp(classNameInput: string, fields: string[]) {
    return `
     public class ${classNameInput}
     {
       ${
          !(fields.length == 1 && fields[0] == "")
          ? 
          fields
              .map(field => `public string ${field} { get; set; }`)
              .join("\n\n")
          : 
          ""
       }
     }
     `;
  }

  goLang(classNameInput: string, fields: string[]) {
    return "";
  }

  java(classNameInput: string, fields: string[]) {
    return `
public class ${classNameInput} {
  private Integer Id;
  private String desc;
  private String cd;
  private Date effvStartDate;
  private Date effvEndDate;
  private String activeFlag;
  private Timestamp version;
${fields.map(field => `  private String ${field};`).join("\n")}
}
`;
  }

  plainObject() {
    const { fieldsInput, classNameInput, selectedLanguage } = this.state;

    var fields = fieldsInput.split(/\s*,\s*/);
    var src = "";

    switch (selectedLanguage) {
       case Language.CSHARP:
        src = this.cSharp(classNameInput, fields);
        break;
      case Language.GO:
        src = this.goLang(classNameInput, fields);
      break;
      case Language.JAVA: 
        src = this.java(classNameInput, fields);
      break;
    }

    navigator.clipboard &&
      navigator.clipboard
        .writeText(src)
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
        Generate Plain Object:
        <br/>
        {
          codeGenList.map((codegen, index) => (
            <React.Fragment key={index}>
              <label 
                htmlFor={codegen.language}
              >
                {codegen.name}
              </label>
              <input
                type="radio"
                id={codegen.language}
                value={codegen.language}
                onChange={this.handleOptionChange}
                checked={this.state.selectedLanguage === codegen.language}
              />
            </React.Fragment>
          ))
        }
        <label>Name</label>
        <input
          type="text"
          value={this.state.classNameInput}
          onChange={this.handleClassNameInputChange}
        />
        <label>Fields</label>
        <input
          type="text"
          value={this.state.fieldsInput}
          onChange={this.handleFieldsInputChange}
        />
        <Button onClick={this.plainObject}>Generate!</Button>
      </div>
    );
  }
}
