# 1️⃣ Node 환경에서 프로젝트 빌드
FROM node:22 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2️⃣ Nginx로 정적 파일 서빙
FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
