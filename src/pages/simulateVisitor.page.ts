import { FrameLocator } from "@playwright/test";
import { BasePage } from "./base.page";

export class SimulateVisitorPage extends BasePage {
  url = `${process.env.BASE_URL}/panel/simulateVisitor`;
  simulateConversationButton = this.page.getByRole("button", {name: "Simulate a conversation"});

  chatFrameSelector = "#tidio-chat-iframe";
  messageContainer = ".message-container";
  closeButton = "#ic_close";
  chatButton = 'text="Chat with us"';
  messageInput = '[placeholder="Hit the buttons to respond"]';
  emailInput = '[placeholder="Enter your email..."]';
  sendButton = 'text="Send"';

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
    const iframe = popup.frameLocator(this.chatFrameSelector);
    await iframe.locator(this.messageContainer).hover();
    await iframe.locator(this.closeButton).click();
  }

  async sendNewMessage(popup: Page,visitorMessage: string,email: string): Promise<void> {
    const iframe: FrameLocator = popup.frameLocator(this.chatFrameSelector);
    await iframe.locator(this.chatButton).click();
    await iframe.locator(this.messageInput).fill(visitorMessage);
    await popup.keyboard.press("Enter");
    await iframe.locator(this.emailInput).fill(email);
    await iframe.locator(this.sendButton).click();
  }
}
