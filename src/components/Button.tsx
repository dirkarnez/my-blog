import * as React from "react";

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = (props: ButtonProps) => <button className="btn btn-primary" {...props}/>