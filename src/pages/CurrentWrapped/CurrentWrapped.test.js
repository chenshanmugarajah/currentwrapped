import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import CurrentWrapped from "./CurrentWrapped";
import * as api from "../../functions/spotifyFunctions";

describe("CurrentWrapped", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should display a header", () => {
    const { getByTestId } = render(<CurrentWrapped />);
    const header = getByTestId("currentwrapped-header");
    const headerValue = header.textContent;
    expect(headerValue).toEqual("Your Top Artists");
  });

  it("should display artist name", async () => {
    api.getTopArtists = jest.fn().mockResolvedValue({
      items: [{ name: "Anirudh Ravichander" }],
    });
    render(<CurrentWrapped />);

    expect(api.getTopArtists).toHaveBeenCalled();

    await waitFor(() => {
      screen.getByText("Anirudh Ravichander");
    });
  });

  it("should display time spent listening", async () => {
    api.getTimeSpentOnSpotify = jest
      .fn()
      .mockResolvedValue("2 hours 51 minutes 52 seconds");
    api.getTopArtists = jest.fn().mockResolvedValue({
      items: [{ name: "Anirudh Ravichander" }],
    });
    render(<CurrentWrapped />);

    expect(api.getTimeSpentOnSpotify).toHaveBeenCalled();

    await waitFor(() => {
      screen.getByText("2 hours 51 minutes 52 seconds");
    });
  });
});
