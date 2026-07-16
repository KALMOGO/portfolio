# Stage 1 — "build": compile the Vue app into static HTML/CSS/JS.
# This stage has Node.js + all dev dependencies, but none of that ships in the final image.
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Baked into the compiled JS at build time (this is a static site, so the
# browser calls this URL directly — it must be reachable from the client, not just from other containers).
ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Stage 2 — "serve": only the tiny nginx image + the compiled static files
# from stage 1 end up in the final image. No Node.js, no node_modules.
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
