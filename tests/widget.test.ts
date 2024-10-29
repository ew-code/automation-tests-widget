import { test } from "@playwright/test";

test.describe("Widget tests", () => {
  test("Send message from widget to panel and from panel to widget", async ({
    page,
  }) => {
    await test.step("Login to project", async () => {
      await page.goto(
        `${process.env.BASE_URL}panel/?project_public_key=${process.env.PROJECT_PUBLIC_KEY}&api_token=${process.env.API_TOKEN}`
      );
    });
    await test.step("Simulate visitor and send message from widget to panel", async () => {
      await page.locator('[data-test-id="inbox-section-button"]').click();
      //TODO
    });
    await test.step("Send a reply message from the panel", async () => {
      //TODO
    });
  });
});
