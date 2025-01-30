FROM openjdk:17

COPY ./build/libs/*.jar app.jar

CMD ["java", "-jar", "app.jar","--server.port=8081"]


#FROM openjdk:17
#OpenJDK 17 이미지를 사용할래요.
#
#COPY ./build/libs/*.jar app.jar
#./build/lib에 있는 jar 파일을 현재 디렉토리에 app.jar라는 이름으로 복사할래요.
#
#CMD ["java", "-jar", "app.jar"]
#container가 실행될 때
#"app.jar 파일을 실행"
#이라는 명령을 실행할래요.