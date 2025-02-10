#!/bin/bash
set -e  # 오류 발생 시 스크립트 즉시 종료

# (필요시) 오래된 이미지 및 볼륨 정리
# echo "오래된 이미지 및 볼륨 정리 중..."
# yes | sudo docker system prune --volumes

# 1. 프론트엔드 빌드 이미지 생성 (Dockerfile이 있는 디렉토리 지정)
echo "프론트엔드 빌드 이미지 생성 중..."
docker build -t infra-frontend /home/ubuntu/jenkins-data/workspace/final/saju-frontend

# 2. 빌드된 컨테이너에서 정적 파일 추출
echo "정적 파일 추출 중..."
# 기존 dist 디렉토리 삭제 (sudo로 실행)
sudo rm -rf /home/ubuntu/jenkins-data/workspace/final/saju-frontend/dist

# 임시 컨테이너 생성
temp_container=$(docker create infra-frontend)
# sudo로 docker cp를 실행하여 dist 디렉토리를 복사
sudo docker cp ${temp_container}:/app/dist /home/ubuntu/jenkins-data/workspace/final/saju-frontend/
# 임시 컨테이너 삭제
docker rm ${temp_container}

echo "프론트엔드 빌드 산출물이 업데이트되었습니다."

# 3. nginx 컨테이너 reload (변경된 파일을 서빙하도록)
echo "nginx 컨테이너 reload 중..."
if docker ps | grep -q nginx; then
  # nginx 컨테이너가 이미 실행 중이면 reload 시그널 전달
  docker exec nginx nginx -s reload || echo "nginx reload 실패, 재시작 필요"
else
  # 실행 중이지 않으면 docker-compose로 시작
  docker-compose -f /home/ubuntu/jenkins-data/workspace/final/infra/docker-compose.yml up -d nginx
fi

echo "배포 파이프라인 완료."
