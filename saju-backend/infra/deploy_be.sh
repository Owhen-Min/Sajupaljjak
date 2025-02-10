#!/bin/bash
set -e

echo "============백엔드 서비스 배포 시작============"

# docker-compose.yml 파일이 위치한 디렉토리로 이동 (저장소 루트의 infra 폴더)
cd ../../infra

docker-compose up -d --no-deps --build backend

echo "============백엔드 서비스 배포 완료============"