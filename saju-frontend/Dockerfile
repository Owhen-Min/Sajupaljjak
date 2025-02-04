# 1️⃣ Node 환경에서 프로젝트 빌드
FROM node:22 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
