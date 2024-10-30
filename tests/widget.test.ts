import { expect, test } from "@playwright/test";
import { PanelPage } from "../src/pages/panel.page";
import { SimulateVisitorPage } from "../src/pages/simulateVisitor.page";
import { faker } from "@faker-js/faker";

test.describe("Widget tests", () => {
  test("Send message from widget to panel and from panel to widget", async ({
    page,
  }) => {
    const panelPage = new PanelPage(page);
    const simulateVisitorPage = new SimulateVisitorPage(page);
    const visitorMessage = `Did you know? The latest ${faker.hacker.noun()} can ${faker.hacker.verb()} faster than any ${faker.animal.type()}!`;
    const email = "recruitment+ewelina.w@tidio.net";

    await test.step("Login to project", async () => {
      await panelPage.loginToProject();
    });

    await test.step("Simulate visitor and send message from widget to panel", async () => {
      await panelPage.goToInboxSection();
      //TODO
      const popup = await simulateVisitorPage.openConversationPopup();
      await simulateVisitorPage.closeChatWidget(popup);
      await simulateVisitorPage.sendNewMessage(popup, visitorMessage, email);
      
    });

    await test.step("Send a reply message from the panel", async () => {
      // TODO: Dodaj kod wysyłania odpowiedzi z panelu
    });
  });
});