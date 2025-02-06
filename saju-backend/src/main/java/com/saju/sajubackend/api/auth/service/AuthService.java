package com.saju.sajubackend.api.auth.service;

import com.saju.sajubackend.api.auth.dto.LoginResponse;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.domain.MemberSocial;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.member.repository.MemberSocialRepository;
import com.saju.sajubackend.common.enums.Gender;
import com.saju.sajubackend.common.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            throw new IllegalArgumentException("유효하지 않은 토큰입니다.");
        }

        // RefreshToken에서 email 추출
        long userId = jwtProvider.getUserIdFromToken(refreshToken);

        // 새로운 AccessToken 발급
        return jwtProvider.createAccessToken(userId);
    }

    @Transactional
    public Member registerNewMember(String email, String name, String gender) {
        // 새로운 Member 생성 로직
        Member member = Member.builder()
                .build(); // 필요한 기본값들 설정

        // MemberSocial 생성 및 연결
        MemberSocial memberSocial = MemberSocial.builder()
                .member(member)
                .email(email)
                .name(name)
                .gender(Gender.valueOf(gender.toUpperCase()))
                .build();

        memberRepository.save(member);
        memberSocialRepository.save(memberSocial);
        return member;
    }

    public boolean isExistingMember(String email) {
        return memberSocialRepository.existsByEmail(email);
    }
}
