import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import "@testing-library/jest-dom";

describe("HomePage", () => {
  test("scope parameter is set correctly in the URL", () => {
    render(<HomePage />);
    const loginButtonElement = screen.getByTestId("login-button");

    expect(loginButtonElement.href).toContain(
      "scope=user-top-read%20user-read-recently-played"
    );
  });

  test("renders without crashing", () => {
    render(<HomePage />);
  });
  
  test("no error elements are present", () => {
    render(<HomePage />);
    const errorElements = screen.queryAllByRole("alert");

    expect(errorElements).toHaveLength(0);
  });

  test("displays login button with expected URL", () => {
    render(<HomePage />);
    const loginButton = screen.getByTestId("login-button");
    const expectedUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=token&scope=user-top-read user-read-recently-played&show_dialog=true`;
    expect(loginButton).toHaveAttribute("href", expectedUrl);
  });
  
});
