# 1️⃣ Node 환경에서 프로젝트 빌드
FROM node:22 as builder
WORKDIR /app

# 🔹 package.json과 package-lock.json 복사
COPY package.json package-lock.json ./
# 🔹 기존 node_modules과 package-lock.json 삭제 (npm 버그 해결)
RUN rm -rf node_modules package-lock.json && npm cache clean --force

# 🔹 npm install 실행
RUN npm install
# 🔹 전체 소스 코드 복사
COPY . .
# 🔹 빌드 실행
RUN npm run build

# 2️⃣ Nginx로 정적 파일 서빙
FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]