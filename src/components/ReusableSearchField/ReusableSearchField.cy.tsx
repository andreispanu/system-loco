import React from "react";
import ReusableSearchField from "./ReusableSearchField";
import { mount } from "@cypress/react18";
import { BrowserRouter } from "react-router-dom";

describe("<ReusableSearchField />", () => {
  it("renders", () => {
    mount(
      <BrowserRouter>
        <ReusableSearchField
          label="Search"
          onChange={(event) => console.log(event.target.value)}
        />
      </BrowserRouter>
    );

    cy.get("[data-testid=reusable-search-field-container]").should("exist");
  });

  it("calls onChange", () => {
    const onChange = cy.stub();
    mount(
      <BrowserRouter>
        <ReusableSearchField label="Search" onChange={onChange} />
      </BrowserRouter>
    );

    cy.get("input").type("test");
    cy.wrap(onChange).should("have.been.called");
  });
});
