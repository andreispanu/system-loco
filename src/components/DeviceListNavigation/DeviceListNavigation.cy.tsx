import React from 'react'
import DeviceListNavigation from './DeviceListNavigation';
import { mount } from "@cypress/react18";
import { BrowserRouter } from "react-router-dom";

describe('<DeviceListNavigation />', () => {
  it("renders", () => {
    mount(
      <BrowserRouter>
        <DeviceListNavigation />
      </BrowserRouter>
    );

    cy.get("[data-testid=reusable-navigation-container]").should("exist");
  });
  
})