import * as React from "react";

const Cat = (props: {
  imageUrl: string;
  altText: string;
  style?: React.CSSProperties;
}) => <img style={props.style} src={props.imageUrl} alt={props.altText} />;

export default Cat;
