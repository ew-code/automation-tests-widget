import { test } from "@playwright/test";
import { PanelPage } from "../src/pages/panel.page";

test.describe("Widget tests", () => {
  test("Send message from widget to panel and from panel to widget", async ({
    page,
  }) => {
    const panelPage = new PanelPage(page);

    await test.step("Login to project", async () => {
      await panelPage.loginToProject();
    });

    await test.step("Simulate visitor and send message from widget to panel", async () => {
      await panelPage.goToInboxSection();
      //TODO
    });
    await test.step("Send a reply message from the panel", async () => {
      //TODO
    });
  });
});
