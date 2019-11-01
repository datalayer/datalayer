import * as React from "react";
import Cat from "./Cat";
import { render, cleanup } from "@testing-library/react";

describe("Cat", () => {
  afterEach(cleanup);

  it("should render an image", () => {
    const imageUrl = "/image/url/image.jpg";
    const altText = "alt text";
    const { getByAltText } = render(
      <Cat altText={altText} imageUrl={imageUrl} />
    );

    getByAltText(altText);
  });
});
