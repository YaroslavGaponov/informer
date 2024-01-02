FROM node:18 as build
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run prune
RUN npx tsc

FROM alpine
RUN apk add --update nodejs
WORKDIR /usr/src/app
COPY package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
ENV NODE_ENV=production
CMD [ "node", "--max-semi-space-size=128", "dist/main.js" ]
