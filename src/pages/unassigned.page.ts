import { BasePage } from "./base.page";
export class UnassignedPage extends BasePage {
  url = `${process.env.BASE_URL}/panel/inbox/conversations/unassigned/`;

  joinConversationButton = this.page.getByRole("button", {name: "Join conversation",});
  newMessageTextarea = this.page.locator('[data-test-id="new-message-textarea"]');
  replyButton = this.page.getByRole("button", { name: "Reply" });
  appContent = this.page.locator("#app-content");

  constructor(protected page: Page) {
    super(page);
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  async replyToVisitorMessage(response: string) {
    await this.joinConversationButton.click();
    await this.newMessageTextarea.fill(response);
    await this.replyButton.click();
  }
}
