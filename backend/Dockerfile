# node:24 so the built-in node:sqlite module is available with no native
# compilation step (avoids needing build tools like python3/make/g++ here).
FROM node:24-alpine

WORKDIR /app

# Copy dependency manifests first so Docker can cache the `npm install`
# layer and skip it on rebuilds where only source code changed.
COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3001
CMD ["node", "server.js"]
