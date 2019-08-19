import * as React from "react";
import { Button } from "../components";

interface ExcelToMarkdownState {
    markdownContent: string
};

export default class ExcelToMarkdown extends React.Component<{}, ExcelToMarkdownState>{
    constructor(props: {}) {
        super(props);

        this.state = {
            markdownContent: ""
        };

        this.convert = this.convert.bind(this);
    }

    convert() {
        navigator.clipboard && navigator.clipboard
            .readText()
            .then(text => {
                const tokens = text
                    .split(/\r?\n/)
                    .filter(line => line.trim().length > 0)
                    .map(line => line.split("\t").map(token => token.trim()))

                const columnsCount = tokens[0].length;

                this.setState({
                    markdownContent: [`|#|${new Array(columnsCount).join("|")}|`, `|-|${new Array(columnsCount).fill("-").join("|")}|`, ...tokens.map((line, lineIndex) => `|${lineIndex}|${line.join("|")}|`)].join("\n")
                });
            })
            .catch(err => {
                alert(err);
            })
    }

    render() {
        const { markdownContent } = this.state;
        return (
            <div>
                <Button onClick={this.convert}>
                    Convert from clipboard
                </Button>
                { markdownContent && <textarea defaultValue={markdownContent} readOnly={true}/> }
            </div>
        );
    }
}