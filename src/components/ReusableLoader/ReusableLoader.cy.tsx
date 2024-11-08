import React from 'react'
import ReusableLoader from './ReusableLoader';
import { mount } from "@cypress/react18";
import { BrowserRouter } from "react-router-dom";

describe('<ReusableLoader />', () => {
  it("renders", () => {
    mount(
      <BrowserRouter>
        <ReusableLoader />
      </BrowserRouter>
    );

    cy.get("[data-testid=reusable-loader-container]").should("exist");
  });

  it("renders loading text", () => {
    mount(
      <BrowserRouter>
        <ReusableLoader />
      </BrowserRouter>
    );

    cy.get("[data-testid=reusable-loader-container]").should("contain.text", "Loading...");
  });

  it("renders circular progress", () => {
    mount(
      <BrowserRouter>
        <ReusableLoader />
      </BrowserRouter>
    );

    cy.get("[data-testid=reusable-loader-container]").find("svg").should("exist");
  });
  
})