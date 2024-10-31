import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PanelPage extends BasePage {
  url = `${process.env.BASE_URL}/panel/`;
  inboxSectionButton = this.page.locator('[data-test-id="inbox-section-button"]');

  constructor(protected page: Page) {
    super(page);
  }

  async goToInboxSection() {
    await this.inboxSectionButton.click();
  }

  async loginToProject() {
    const parameters = `?project_public_key=${process.env.PROJECT_PUBLIC_KEY}&api_token=${process.env.API_TOKEN}`;
    await this.goto(parameters);
  }

}
