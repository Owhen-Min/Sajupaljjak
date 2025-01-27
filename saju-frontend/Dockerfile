FROM node:22.11.0

#현재 컨테이너 디렉토리 루트 경로명이 frontend 이다.
WORKDIR /frontend

# bookwave-front 전체 복사 -> FE 프로젝트 전체
COPY . ./

# 이건 docker-compose에서 포트 매핑 해줬으니까 안해도 됨
EXPOSE 3000

# 컨테이너 안에서 node_module 설치
RUN npm install --silent

# 컨테이너 내에서 서버 실행
CMD ["npm", "run", "dev"]