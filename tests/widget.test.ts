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
      const popup = await simulateVisitorPage.openConversationPopup();
      await simulateVisitorPage.closeChatbot(popup);
      await simulateVisitorPage.sendNewMessage(popup, visitorMessage, email);
      // www.tidio.com/panel/inbox/conversations/unassigned/7686e72ddf274a37b5db6c965a8dda9d
      await page.getByRole("button", { name: "Go to Unassigned" }).click();
      await page.getByRole("button", { name: "👋   Unassigned 1" }).click();
      await page.locator("#app-content").getByText(visitorMessage).click();
      await expect(page.locator("#app-content").getByText(visitorMessage)).toBeVisible();
    });

    await test.step("Send a reply message from the panel", async () => {
      await page.getByRole("button", { name: "Join conversation" }).click();
      await page.locator('[data-test-id="new-message-textarea"]').fill("response for message text sample");
      await page.getByRole("button", { name: "Reply" }).click();
      await expect(page.locator("#app-content").getByText("response for message text")).toBeVisible();
    });
  });
});
