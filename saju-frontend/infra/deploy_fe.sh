#!/bin/bash
set -e  # 오류 발생 시 스크립트 즉시 종료

## 🔹 필요하면 오래된 이미지 및 볼륨 정리 (Jenkins 제외)
#echo "Running system prune..."
#yes | sudo docker system prune --volumes

# 🔹 프론트엔드 먼저 빌드 및 실행 (docker-compose.yml 파일은 infra 폴더에 위치)
echo "Building and starting frontend..."
docker-compose -f /home/ubuntu/jenkins-data/workspace/infra/infra/docker-compose.yml up -d --no-deps --build frontend

# 🔹 프론트엔드 컨테이너가 정상적으로 실행될 때까지 대기
echo "Waiting for frontend to be ready..."
while ! sudo docker ps | grep -q 'saju-frontend'; do
  sleep 2
done
