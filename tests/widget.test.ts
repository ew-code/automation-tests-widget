import { expect, test } from "@playwright/test";
import { PanelPage } from "../src/pages/panel.page";
import { SimulateVisitorPage } from "../src/pages/simulateVisitor.page";
import { faker } from "@faker-js/faker";
import { UnassignedPage } from "../src/pages/unassigned.page";
import { testData } from "../src/test-data/test.data";

test.describe("Widget tests", () => {
  test("Send message from widget to panel and from panel to widget", async ({
    page,
  }) => {
    const panelPage = new PanelPage(page);
    const simulateVisitorPage = new SimulateVisitorPage(page);
    const unassignedPage = new UnassignedPage(page);

    const visitorMessage = testData.visitorMessage();
    const email = testData.email;
    const responseMessage = testData.responseMessage();

    await test.step("Login to project", async () => {
      await panelPage.loginToProject();
    });

    await test.step("Simulate visitor and send message from widget to panel", async () => {
      await panelPage.goToInboxSection();
      const popup = await simulateVisitorPage.openConversationPopup();
      await simulateVisitorPage.closeChatWidget(popup);
      await simulateVisitorPage.sendNewMessage(popup, visitorMessage, email);
      await unassignedPage.navigateTo();
      await expect(
        unassignedPage.appContent.getByText(visitorMessage)
      ).toBeVisible();
    });

    await test.step("Send a reply message from the panel", async () => {
      await unassignedPage.replyToVisitorMessage(responseMessage);
      await expect(unassignedPage.appContent.getByText(responseMessage)).toBeVisible();
    });
  });
});
