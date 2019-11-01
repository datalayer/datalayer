import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "@testing-library/react";
import axios from "axios";
import * as React from "react";
import { ToggleCat } from "./ToggleCat";
jest.mock("axios");

describe("Toggle Cat", () => {
  afterEach(cleanup);

  it("should load a bunch of cats when toggle is clicked", async () => {
    const buttonText = "Show all the cats!";

    const cats = [
      { url: "./__mocks__/imaages/d7j.jpg", id: "d7j.jpg" },
      { url: "url/2", id: "1" }
    ];
    axios.get.mockResolvedValue({ data: cats });

    // should render a page with a tempting button
    const {
      findAllByAltText,
      queryAllByText,
      getByText,
      queryByAltText
    } = render(<ToggleCat />);

    // should not have mounted any image so far
    expect(queryByAltText("... a cat ...")).toEqual(null);

    // trigger mounting of cat components
    fireEvent.click(getByText(buttonText));

    const fallback = await waitForElement(() =>
      queryAllByText("... Loading ...")
    );

    // should render two fallback spinners (as we pass in two cats in this test)
    expect(
      await waitForElement(() => queryAllByText("... Loading ...").length)
    ).toEqual(2);

    // after sleeping a bit, we should see two cats
    const lazycat = await waitForElement(() =>
      findAllByAltText("... a cat ...")
    );

    expect(lazycat.length).toEqual(2);
  });
});
