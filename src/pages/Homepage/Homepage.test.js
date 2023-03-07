import React from "react";
import { render, waitFor } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import HomePage from "./HomePage";

jest.mock("spotify-web-api-js", () => {
  return jest.fn().mockImplementation(() => {
    return {
      setAccessToken: jest.fn(),
    };
  });
});

describe("HomePage", () => {
  it("should render a header and a login button", () => {
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId("homepage-header")).toBeInTheDocument();
    expect(getByTestId("login-button")).toBeInTheDocument();
  });

//   it("should redirect to /currentwrapped after logging in", async () => {
//     window.history.pushState({}, "", "/");
//     const { getByTestId } = render(<HomePage />);
//     const loginButton = getByTestId("login-button");
//     expect(loginButton).toHaveAttribute("href", expect.stringContaining("spotify.com"));

//     // const mockedGetHashParams = jest.spyOn(HomePage.prototype, "getHashParams");
//     // mockedGetHashParams.mockImplementation(() => {
//     //   return { access_token: "test-access-token" };
//     // });

//     loginButton.click();

//     await waitFor(() => {
//     //   expect(mockedGetHashParams).toHaveBeenCalled();
//       expect(window.location.href).toContain("/currentwrapped");
//     });
//   });
});
