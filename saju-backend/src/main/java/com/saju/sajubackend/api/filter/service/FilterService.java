package com.saju.sajubackend.api.filter.service;

import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.filter.domain.RegionFilter;
import com.saju.sajubackend.api.filter.domain.ReligionFilter;
import com.saju.sajubackend.api.filter.dto.FilterSaveRequestDto;
import com.saju.sajubackend.api.filter.dto.MemberProfileResponse;
import com.saju.sajubackend.api.filter.dto.UpdateProfileRequest;
import com.saju.sajubackend.api.filter.repository.FilterRepository;
import com.saju.sajubackend.api.filter.repository.RegionFilterRepository;
import com.saju.sajubackend.api.filter.repository.ReligionFilterRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.domain.MemberSocial;
import com.saju.sajubackend.api.member.domain.QMemberSocial;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.member.repository.MemberSocialRepository;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FilterService {

    private final FilterRepository filterRepository;
    private final ReligionFilterRepository religionFilterRepository;
    private final RegionFilterRepository regionFilterRepository;
    private final MemberRepository memberRepository;
    private final MemberSocialRepository memberSocialRepository;

    @Transactional
    public void createFilter(FilterSaveRequestDto request, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        Filter filter = filterRepository.save(request.toFilter(member));

        saveRegionFilters(request.regionFilter(), filter);
        saveReligionFilters(request.toReligionFilters(filter));
    }


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
                .build();
    }


    private void saveRegionFilters(List<Long> cityCodes, Filter filter) {
        if (cityCodes.isEmpty()) return;

        List<RegionFilter> regionFilters = cityCodes.stream()
                .map(cityCode -> RegionFilter.builder()
                        .cityCode(cityCode)
                        .filter(filter)
                        .build())
                .collect(Collectors.toList());

        regionFilterRepository.saveAll(regionFilters);
    }

    private void saveReligionFilters(List<ReligionFilter> religions) {
        if (religions.isEmpty()) return;

        religionFilterRepository.saveAll(religions);
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
        member.updateCityCode(request.getCityCode());
    }
}