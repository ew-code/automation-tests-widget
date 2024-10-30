import { FrameLocator } from "@playwright/test";
import { BasePage } from "./base.page";

export class SimulateVisitorPage extends BasePage {
  url = `${process.env.BASE_URL}/panel/simulateVisitor`;
  simulateConversationButton = this.page.getByRole("button", {
    name: "Simulate a conversation",
  });

  constructor(protected page: Page) {
    super(page);
  }

  async openConversationPopup(): Promise<Page> {
    const [popup] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.simulateConversationButton.click(),
    ]);
    await popup.waitForLoadState();
    return popup;
  }

  async closeChatWidget(popup: Page): Promise<void> {
    const iframe = popup.frameLocator("#tidio-chat-iframe");
    await iframe.locator(".message-container").hover();
    await iframe.locator("#ic_close").click();
  }

  async sendNewMessage(popup: Page, visitorMessage: string, email: string): Promise<void> {
    const iframe: FrameLocator = popup.frameLocator("#tidio-chat-iframe");
    await iframe.locator('text="Chat with us"').click();
    await iframe.locator('[placeholder="Hit the buttons to respond"]').fill(visitorMessage);
    await popup.keyboard.press("Enter");
    await iframe.locator('[placeholder="Enter your email..."]').fill(email);
    await iframe.locator('text="Send"').click();
  }
}
