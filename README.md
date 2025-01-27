## 📌 프로젝트 소개
- 💞 사주팔짝은 사주를 기반으로한 매칭 & 데이팅 플랫폼입니다.
- 🍀 솔로 : 궁합 채팅 & 랜덤 채팅
- 💑 커플 : 데이트 장소 추천, 캘린더
- 🧶 공통 : 사주 & 운세 풀이, 사주 커뮤니티

## 🙋🏻‍♀️ 역할 분담

<div markdown="1">  
 
| 기능명 | 담당자 | 완료 여부 |
| :-----: | :---: | :---: |
|  |  |  |

<br>

## 📂 Project Foldering

```
com
 ㄴ saju
     ㄴ sajubackend
         ㄴ api
         |   ㄴ member
         |   |   ㄴ controller
         |   |   ㄴ service
         |   |   ㄴ domain
         |   |   ㄴ dto
         |   ㄴ auth
         |   |   ㄴ controller
         |   |   ㄴ service
         |   |   ㄴ domain
         |   |   ㄴ dto
         |   ...
         ㄴ common
         |   ㄴ advice
         |   ㄴ config
         |   |    ㄴ jwt
         |   ㄴ entity
         |   ㄴ exception
         |   ㄴ util
         ㄴ external
         |   ㄴ ...
         ㄴ SajuBackendApplication

```
<br>

## 📌 Coding Convention

[캠퍼스 핵데이](https://naver.github.io/hackday-conventions-java/)


 
 <br>
 
 ## 📌Git Convention
 ### 🔹Commit Convention
 - ✅ `[CHORE]` : 동작에 영향 없는 코드 or 변경 없는 변경사항(주석 추가 등)
- ✨ `[FEAT]` : 새로운 기능 구현
- ➕ `[ADD]` : Feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성
- 🔨 `[FIX]` : 버그, 오류 해결
- ⚰️ `[DEL]` : 쓸모없는 코드 삭제
- 📝 `[DOCS]` : README나 WIKI 등의 문서 수정
- ✏️ `[CORRECT]` : 주로 문법의 오류나 타입의 변경, 이름 변경시
- ⏪️ `[RENAME]` : 파일 이름 변경시
- ♻️ `[REFACTOR]` : 전면 수정
- 🔀 `[MERGE]`: 다른 브랜치와 병합

### 커밋 예시

`ex ) git commit -m "#{이슈번호} [FEAT] 회원가입 기능 완료"`

<br>

### 🔹Branch Convention
- develop : 최종 배포
- feat : 기능 추가
- fix : 에러 수정, 버그 수정
- docs : README, 문서
- refactor : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
- modify : 코드 수정 (기능의 변화가 있을 때)
- chore : gradle 세팅, 위의 것 이외에 거의 모든 것


<br>

### 🔹Branch Strategy
### Git Flow

기본적으로 Git Flow 전략을 이용한다. Fork한 후 나의 repository에서 작업하고 구현 후 원본 repository에 pr을 날린다. 작업 시작 시 선행되어야 할 작업은 다음과 같다.

```java
1. Issue를 생성한다.
2. feature Branch를 생성한다.
3. Add - Commit - Push - Pull Request 의 과정을 거친다.
4. Pull Request가 작성되면 작성자 이외의 다른 팀원이 Code Review를 한다.
5. Code Review가 완료되면 Pull Request 작성자가 develop Branch로 merge 한다.
6. merge된 작업이 있을 경우, 다른 브랜치에서 작업을 진행 중이던 개발자는 본인의 브랜치로 merge된 작업을 Pull 받아온다.
7. 종료된 Issue와 Pull Request의 Label과 Project를 관리한다.
```

main, develop, front/back, front/back_feature 3가지 branch 를 기본으로 합니다.
main → develop → front,back→ front/back_feature. feature 브랜치는 feat/기능명으로 사용합니다.
이슈를 사용하는 경우 브랜치명을 feat/[issue num]-[feature name]로 합니다.

<br>


### 🔹Issue Convention
- [FEAT] : 기능 추가
- [FIX] : 에러 수정, 버그 수정
- [DOCS] : README, 문서
- [REFACTOR] : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
- [MODIFY] : 코드 수정 (기능의 변화가 있을 때)
- [CHORE] : gradle 세팅, 위의 것 이외에 거의 모든 것

`ex) [FEAT] user api 구현`
