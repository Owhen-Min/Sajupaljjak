package com.saju.sajubackend.api.auth.service;

import com.saju.sajubackend.api.auth.dto.KakaoUserResponse;
import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.auth.dto.SignupRequest;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.domain.MemberSocial;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.member.repository.MemberSocialRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.repository.SajuRepository;
import com.saju.sajubackend.api.token.RefreshToken;
import com.saju.sajubackend.common.enums.*;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.UnAuthorizedException;
import com.saju.sajubackend.common.jwt.JwtProvider;
import com.saju.sajubackend.common.util.CelestialStemCalculator;
import com.saju.sajubackend.common.util.FourPillarsCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthService {
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final MemberSocialRepository memberSocialRepository;
    private final SajuRepository sajuRepository;
    private final RefreshTokenService refreshTokenService;
    private final AccessTokenRedisService accessTokenRedisService;

    @Transactional
    public LoginResponse login(KakaoUserResponse kakaoUserResponse) {
        String email = kakaoUserResponse.getKakao_account().getEmail();
        log.info("🔎 [로그인 요청] 카카오 이메일: {}", email);


        // 이메일로 회원 조회
        Optional<Member> optionalMember = memberSocialRepository.findMemberByEmail(email);


        // 회원가입 안되어 있는 경우
        if (optionalMember.isEmpty()) {
            log.warn("❌ [로그인 실패] 이메일 '{}'로 가입된 회원 없음", email);
            return LoginResponse.ofFailure(email);
        }

        Member member = optionalMember.get();
        log.info("✅ [로그인 성공] 회원 정보: {}", member);

        // ✅ 추가 조회: MemberSocial에서 name 가져오기
        MemberSocial memberSocial = memberSocialRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(HttpStatus.NOT_FOUND, ErrorMessage.MEMBER_NOT_FOUND));


        // JWT 토큰 생성
        String accessToken = jwtProvider.createAccessToken(member.getMemberId());
        String refreshToken = jwtProvider.createRefreshToken(member.getMemberId());


        // 액세스 토큰을 Redis에 저장 (유효기간 설정 필요)
        accessTokenRedisService.saveAccessToken(member.getMemberId(), accessToken, jwtProvider.getAccessTokenExpirationTime());

        // 리프레시 토큰을 DB에 저장
        refreshTokenService.saveRefreshToken(member, refreshToken);

//        String name = "나중에";
        return LoginResponse.ofSuccess(
                member.getMemberId(),
                memberSocial.getName(),
                member.getNickname(),
                member.getRelation().getLabel(),
                member.getProfileImg(),
                member.getCityCode(),
                member.getReligion().getLabel(),
                member.getAge(),
                member.getCelestialStem().getLabel(),
                member.getIntro(),
                new LoginResponse.TokenInfo(accessToken,refreshToken));
    }

    @Transactional
    public void logout(String email) {
        // Redis에서 RefreshToken 삭제 로직 추가 필요
        // 추가적인 로그아웃 처리 로직이 필요한 경우 여기에 구현
    }

    public String refreshAccessToken(String refreshToken) {
        // RefreshToken 검증
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new UnAuthorizedException(ErrorMessage.REFRESH_TOKEN_EXPIRED);
        }

        // RefreshToken에서 email 추출
        long userId = jwtProvider.getUserIdFromToken(refreshToken);

        // 새로운 AccessToken 발급
        Optional<RefreshToken> storedToken = refreshTokenService.getRefreshToken(userId);
        if (storedToken.isEmpty() || !storedToken.get().getRefreshToken().equals(refreshToken)) {
            throw new UnAuthorizedException(ErrorMessage.INVALID_REFRESH_TOKEN);
        }

        String newAccessToken = jwtProvider.createAccessToken(userId);
        accessTokenRedisService.saveAccessToken(userId, newAccessToken, jwtProvider.getAccessTokenExpirationTime());

        return newAccessToken;
    }

    public boolean isExistingMember(String email) {
        return memberSocialRepository.existsByEmail(email);
    }

    @Transactional
    public LoginResponse signup(SignupRequest request) {
        // 닉네임 중복 확인
        if (memberRepository.existsByNickname(request.getNickname())) {
            throw new BaseException(HttpStatus.CONFLICT, ErrorMessage.DUPLICATE_NICKNAME);
        }
        // 생년월일 파싱 및 시간 파싱
        LocalDate birthDate = LocalDate.parse(request.getBday());
        LocalDateTime birthDateTime = LocalDateTime.parse(request.getBday() + "T" + request.getBtime());

        //천간 계산
        String celestialStem = CelestialStemCalculator.calculateCelestialStem(birthDate);

        // 사주(연주, 월주, 일주, 시주) 계산
        FourPillarsCalculator.FourPillars saju = FourPillarsCalculator.calculate(birthDateTime);

        // Member 엔티티 생성
        Member member = Member.builder()
                .bday(birthDate)
                .btime(birthDateTime)
                .relation(RelationshipStatus.fromLabel(request.getRelation()))
                .nickname(request.getNickname())
                .intro(request.getIntro())
                .profileImg(request.getProfileImg())
                .height(request.getHeight())
                .cityCode(request.getCityCode())
                .smoking(SmokingStatus.fromLabel(request.getSmoking()))
                .drinking(DrinkingFrequency.fromLabel(request.getDrinking()))
                .religion(Religion.fromLabel(request.getReligion()))
                .gender(Gender.fromLabel(request.getGender()))
                .celestialStem(CelestialStem.fromLabel(celestialStem))
                .relation(RelationshipStatus.fromLabel(request.getRelation()))
                .age(request.getAge())
                .build();
        Member savedMember = memberRepository.save(member);

        // 사주 저장
        Saju newSaju = Saju.builder()
                .member(savedMember)
                .yearly(saju.yearPillar)  // 연주 (천간 + 지지 포함)
                .monthly(saju.monthPillar) // 월주 (천간 + 지지 포함)
                .daily(saju.dayPillar) // 일주 (천간 + 지지 포함)
                .timely(saju.hourPillar) // 시주 (천간 + 지지 포함)
                .build();
        sajuRepository.save(newSaju);

        // MemberSocial 엔티티 생성
        MemberSocial memberSocial = MemberSocial.builder()
                .member(savedMember)
                .name(request.getName())
                .email(request.getEmail())
                .build();
        System.out.println(memberSocial.toString());
        memberSocialRepository.save(memberSocial);

        // 토큰 생성
        String accessToken = jwtProvider.createAccessToken(savedMember.getMemberId());
        String refreshToken = jwtProvider.createRefreshToken(savedMember.getMemberId());

        // LoginResponse 생성 및 반환
        return LoginResponse.ofSuccess(
                savedMember.getMemberId(),
                memberSocial.getName(),
                savedMember.getNickname(),
                savedMember.getRelation().getLabel(),
                savedMember.getProfileImg(),
                savedMember.getCityCode(),
                savedMember.getReligion().getLabel(),
                savedMember.getAge(),
                savedMember.getCelestialStem().getLabel(),
                savedMember.getIntro(),
                LoginResponse.TokenInfo.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build()
        );
    }

    public boolean checkNicknameAvailability(String nickname) {
        return !memberRepository.existsByNickname(nickname);
    }

}