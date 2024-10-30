FROM mcr.microsoft.com/playwright:v1.48.1-noble

WORKDIR /playwright

COPY package*.json ./

COPY . .

RUN npm install

RUN npx playwright install

CMD ["npx", "playwright", "test"]