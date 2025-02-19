package com.saju.sajubackend.api.member.service;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.domain.MemberSocial;
import com.saju.sajubackend.api.member.dto.MemberProfileResponse;
import com.saju.sajubackend.api.member.dto.SajuUpdateRequest;
import com.saju.sajubackend.api.member.dto.UpdateProfileRequest;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.member.repository.MemberSocialRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.repository.SajuRepository;
import com.saju.sajubackend.common.enums.CelestialStem;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.util.CelestialStemCalculator;
import com.saju.sajubackend.common.util.FourPillarsCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberSocialRepository memberSocialRepository;
    private final SajuRepository sajuRepository;

    @Transactional(readOnly = true)
    public MemberProfileResponse getMemberProfile(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        // MemberSocial에서 Member 객체를 기반으로 조회
        String name = memberSocialRepository.findByMember(member)
                .map(MemberSocial::getName) // Optional에서 name 추출
                .orElse(member.getNickname()); // `MemberSocial`에 `name` 없으면 `nickname` 사용

        return MemberProfileResponse.builder()
                .name(name) //
                .nickname(member.getNickname())
                .gender(member.getGender().getLabel()) // Enum → String 변환
                .profileImage(member.getProfileImg())
                .cityCode(member.getCityCode() != null ? String.valueOf(member.getCityCode()) : null) // 🔹 String 변환
                .dongCode(member.getDongCode() != null ? String.valueOf(member.getDongCode()) : null) // 🔹 String 변환
                .religion(member.getReligion().getLabel()) // Enum → String 변환
                .age(member.getAge())
                .height(member.getHeight())
                .celestialStem(member.getCelestialStem() != null ? member.getCelestialStem().getLabel() : null) // label 반환
                .intro(member.getIntro())
                .smoking(member.getSmoking().getLabel())
                .drinking(member.getDrinking().getLabel())
                .bday(member.getBday() != null ? String.valueOf(member.getBday()) : null) // 🔹 String 변환
                .btime(member.getBtime() != null ? String.valueOf(member.getBtime()) : null) // 🔹 String 변환
                .build();
    }

    @Transactional
    public void updateMemberProfile(Long memberId, UpdateProfileRequest request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));
        member.updateNickname(request.getNickname());
        member.updateIntro(request.getIntro());

        // 🔹 Enum 변환 로직 간소화
        if (request.getReligion() != null) {
            member.updateReligion(Religion.fromLabel(request.getReligion()));
        }
        if (request.getSmoking() != null) {
            member.updateSmoking(SmokingStatus.fromLabel(request.getSmoking()));
        }
        if (request.getDrinking() != null) {
            member.updateDrinking(DrinkingFrequency.fromLabel(request.getDrinking()));
        }

        member.updateHeight(request.getHeight());
        member.updateCityCode(Long.valueOf(request.getCityCode()));
    }

    @Transactional
    public void updateSaju(Long memberId, SajuUpdateRequest request) {
        log.info("🔍 [updateSaju 요청] memberId: {}", memberId);

        // ✅ 회원 조회 (수정 전 정보 확인)
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> {
                    log.error("❌ [updateSaju 실패] memberId: {} 회원 정보를 찾을 수 없음", memberId);
                    return new BaseException(HttpStatus.NOT_FOUND, ErrorMessage.MEMBER_NOT_FOUND);
                });

        // ✅ 기존 Saju 정보 조회 (수정 전 정보 확인)
        Saju memberSaju = sajuRepository.findByMember(member)
                .orElseThrow(() -> {
                    log.error("❌ [updateSaju 실패] memberId: {} 회원의 사주 정보를 찾을 수 없음", memberId);
                    return new BaseException(HttpStatus.NOT_FOUND, ErrorMessage.SAJU_NOT_FOUND);
                });

        // 🔹 수정 전 Saju 정보 로그 출력
        log.info("🛑 [수정 전 Saju 정보] memberId: {} | 연주: {} | 월주: {} | 일주: {} | 시주: {}",
                memberId, memberSaju.getYearly(), memberSaju.getMonthly(), memberSaju.getDaily(), memberSaju.getTimely());

        // 생년월일 변환
        LocalDate birthDate = LocalDate.parse(
                String.format("%s-%s-%s", request.getBirthYear(), request.getBirthMonth(), request.getBirthDay())
        );
        LocalDateTime birthDateTime = LocalDateTime.parse(
                String.format("%s-%s-%sT%s:%s",
                        request.getBirthYear(), request.getBirthMonth(), request.getBirthDay(),
                        request.getBirthHour(), request.getBirthMinute())
        );

        // 천간 계산 + 업데이트
        String celestialStem = CelestialStemCalculator.calculateCelestialStem(birthDate);
        member.updateCelestialStem(CelestialStem.fromLabel(celestialStem));

        // 사주(연주, 월주, 일주, 시주) 계산
        FourPillarsCalculator.FourPillars saju = FourPillarsCalculator.calculate(birthDateTime);

        // ✅ 기존 Saju 정보 업데이트
        memberSaju.updateSaju(saju.dayPillar, saju.monthPillar, saju.yearPillar, saju.hourPillar);

        // 🔹 수정 후 Saju 정보 로그 출력
        log.info("✅ [수정 후 Saju 정보] memberId: {} | 연주: {} | 월주: {} | 일주: {} | 시주: {}",
                memberId, saju.yearPillar, saju.monthPillar, saju.dayPillar, saju.hourPillar);

        // ✅ 변경된 정보 저장
        sajuRepository.save(memberSaju);
        memberRepository.save(member);
    }
}
