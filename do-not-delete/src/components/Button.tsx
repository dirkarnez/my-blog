import * as React from "react";

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default (props: ButtonProps) => <button className="btn btn-primary" {...props}/>