# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

FROM base AS build
COPY . .
ARG VITE_API_BASE_URL=
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
