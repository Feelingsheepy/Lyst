FROM node:lts-alpine as development

# 1. Build core
WORKDIR /usr/src/core
COPY core/package*.json ./
COPY core/tsconfig.json ./
RUN npm install
COPY core/src ./src
RUN npm run build
RUN npm link

# 2. Build core-services
WORKDIR /usr/src/core-services
COPY core-services/package*.json ./
COPY core-services/tsconfig.json ./
RUN npm install
RUN npm link lyst-core
COPY core-services/src ./src
RUN npm run build
RUN npm link

# 3. Build validation-service
WORKDIR /usr/src/app
COPY validation-service/package*.json ./
RUN npm install
COPY validation-service/src ./src
COPY validation-service/tsconfig.json ./
RUN npm link /usr/src/core
RUN npm link /usr/src/core-services
RUN npm run build

CMD ["npm", "run", "debug"]

FROM node:lts-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY validation-service/package*.json ./
RUN npm ci --only=production
USER node
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/bootstrap"]