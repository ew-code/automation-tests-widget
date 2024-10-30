FROM mcr.microsoft.com/playwright:v1.48.1-noble

WORKDIR /playwright

ENV PATH /playwright/node_modules/.bin:$PATH

COPY package*.json ./

COPY . .

RUN npm config set strict-ssl false

RUN npm install

RUN npx playwright install

RUN mkdir -p /.npm/_logs && chmod -R 777 /.npm