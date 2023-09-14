describe("Intitalization of Burger app and constructor functionality", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("mock-refreshToken")
    );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("mock-accessToken")
    );

    cy.visit("localhost:3000/");
    cy.intercept("GET", "/api/ingredients", {
      fixture: "ingredientsData",
    });
  });

  it("should open and close ingredients details by click", () => {
    cy.get("[data-cy='Краторная булка N-200i']").click();
    cy.get("[data-cy='title']").should("have.text", "Детали ингредиента");
    cy.get("[data-cy='ingredient title']").should(
      "have.text",
      "Краторная булка N-200i"
    );
    cy.get("[data-cy='close']").click();
    cy.get("[data-cy='constructor title']").should(
      "have.text",
      "Соберите бургер"
    );
  });

  it("Can drag ingredients and make order", () => {
    cy.get("[data-cy='Краторная булка N-200i']").trigger("dragstart");
    cy.get("[data-cy='constructor'").trigger("drop");
    cy.get("[data-cy='Краторная булка N-200i counter']").should(
      "have.text",
      "1"
    );
    cy.get(".constructor-ingredient").contains("Краторная булка N-200i");
    cy.get("[data-cy='Биокотлета из марсианской Магнолии']").trigger(
      "dragstart"
    );
    cy.get("[data-cy='constructor']").trigger("drop");
    cy.get("[data-cy='Биокотлета из марсианской Магнолии counter']").should(
      "have.text",
      "1"
    );
    cy.get("[data-cy='constructor'] .constructor-ingredient").contains(
      "Биокотлета из марсианской Магнолии"
    );
    cy.get("[data-cy='order info'] .order-button").click();
    cy.get("[data-cy='order load']").should(
      "have.text",
      "Оформляем ваш заказ..."
    );
    cy.get("[data-cy='order text']").should(
      "have.text",
      "идентификатор заказа"
    );
  });
});
