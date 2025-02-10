package com.saju.sajubackend.api.auth.service;

import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.auth.dto.SignupRequest;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.domain.MemberSocial;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.member.repository.MemberSocialRepository;
import com.saju.sajubackend.common.enums.*;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.UnAuthorizedException;
import com.saju.sajubackend.common.jwt.JwtProvider;
import com.saju.sajubackend.common.util.CelestialStemCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthService {
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final MemberSocialRepository memberSocialRepository;

    @Transactional
    public LoginResponse login(String email) {
        // 이메일로 회원 조회
        Optional<Member> optionalMember = memberSocialRepository.findMemberByEmail(email);

        // 회원가입 안되어 있는 경우
        if (optionalMember.isEmpty()) {
            return LoginResponse.ofFailure(email);
        }

        Member member = optionalMember.get();

        // JWT 토큰 생성
        String accessToken = jwtProvider.createAccessToken(member.getMemberId());
        String refreshToken = jwtProvider.createRefreshToken(member.getMemberId());
        LoginResponse.TokenInfo tokenInfo = new LoginResponse.TokenInfo(accessToken, refreshToken);

        String name = "나중에";
        return LoginResponse.ofSuccess(member.getNickname(),
                member.getProfileImg(),
                member.getCityCode(),
                member.getReligion(),
                member.getAge(),
                member.getIntro(),
                tokenInfo);
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
        return jwtProvider.createAccessToken(userId);
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
        System.out.println(request.toString());
        // 생년월일 파싱 및 천간 계산
        LocalDate birthDate = LocalDate.parse(request.getBday());
        String celestialStem = CelestialStemCalculator.calculateCelestialStem(birthDate);

        // Member 엔티티 생성
        Member member = Member.builder()
                .bday(birthDate)
                .btime(LocalDateTime.parse(request.getBday() + "T" + request.getBtime()))
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
                savedMember.getNickname(),
                savedMember.getProfileImg(),
                savedMember.getCityCode(),
                savedMember.getReligion(),
                savedMember.getAge(),
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