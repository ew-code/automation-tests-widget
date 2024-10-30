import { faker } from "@faker-js/faker";

export const testData = {
  visitorMessage: (): string =>`Fun fact: A ${faker.hacker.noun()} can ${faker.hacker.verb()} like a ${faker.animal.type()}!`,
  email: "recruitment+ewelina.w@tidio.net",
  responseMessage: (): string => `Haha, only if it's faster than my ${faker.animal.type()}!`,
};