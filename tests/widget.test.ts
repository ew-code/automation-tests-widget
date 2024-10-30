import { expect, test } from "@playwright/test";
import { PanelPage } from "../src/pages/panel.page";
import { SimulateVisitorPage } from "../src/pages/simulateVisitor.page";
import { faker } from "@faker-js/faker";
import { UnassignedPage } from "../src/pages/unassigned.page";

test.describe("Widget tests", () => {
  test("Send message from widget to panel and from panel to widget", async ({
    page,
  }) => {
    const panelPage = new PanelPage(page);
    const simulateVisitorPage = new SimulateVisitorPage(page);
    const unassignedPage = new UnassignedPage(page);
    const visitorMessage = `Fun fact: A ${faker.hacker.noun()} can ${faker.hacker.verb()} like a ${faker.animal.type()}!`;
    const email = "recruitment+ewelina.w@tidio.net";
    const responseMessage = `Haha, only if it's faster than my ${faker.animal.type()}!`;

    await test.step("Login to project", async () => {
      await panelPage.loginToProject();
    });

    await test.step("Simulate visitor and send message from widget to panel", async () => {
      await panelPage.goToInboxSection();
      const popup = await simulateVisitorPage.openConversationPopup();
      await simulateVisitorPage.closeChatWidget(popup);
      await simulateVisitorPage.sendNewMessage(popup, visitorMessage, email);
      await unassignedPage.navigateTo();
      await expect(unassignedPage.appContent.getByText(visitorMessage)).toBeVisible();
    });

    await test.step("Send a reply message from the panel", async () => {
      await unassignedPage.joinConversationButton.click();
      await unassignedPage.newMessageTextarea.fill(responseMessage);
      await unassignedPage.replyButton.click();
      await expect(unassignedPage.appContent.getByText(responseMessage)).toBeVisible();
    });
  });
});
