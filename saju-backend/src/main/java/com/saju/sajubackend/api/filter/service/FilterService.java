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
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FilterService {

    private final FilterRepository filterRepository;
    private final ReligionFilterRepository religionFilterRepository;
    private final RegionFilterRepository regionFilterRepository;
    private final MemberRepository memberRepository;

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

        return MemberProfileResponse.builder()
                .name(member.getNickname()) // name 필드 대신 nickname 사용
                .nickname(member.getNickname())
                .gender(member.getGender().name()) // Enum → String 변환
                .profileImage(member.getProfileImg())
                .cityCode(member.getCityCode())
                .religion(member.getReligion().name()) // Enum → String 변환
                .age(member.getAge())
                .height(member.getHeight())
                .celestialStem(member.getCelestialStem() != null ? member.getCelestialStem().name() : null) // null 체크
                .intro(member.getIntro())
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

        if (request.getNickname() != null) {
            member.setNickname(request.getNickname());
        }
        if (request.getIntro() != null) {
            member.setIntro(request.getIntro());
        }
        if (request.getReligion() != null) {
            member.setReligion(convertReligion(request.getReligion()));
        }
        if (request.getSmoking() != null) {
            member.setSmoking(convertSmoking(request.getSmoking()));
        }
        if (request.getDrinking() != null) {
            member.setDrinking(convertDrinking(request.getDrinking()));
        }
        if (request.getHeight() != null) {
            member.setHeight(request.getHeight());
        }
        if (request.getCityCode() != null) {
            member.setCityCode(request.getCityCode());
        }
    }

    private Religion convertReligion(String religion) {
        Map<String, Religion> religionMap = Map.of(
                "무교", Religion.NONE,
                "기독교", Religion.CHRISTIANITY,
                "불교", Religion.BUDDHISM,
                "천주교", Religion.CATHOLICISM,
                "기타", Religion.OTHER
        );

        if (!religionMap.containsKey(religion)) {
            throw new BadRequestException(ErrorMessage.INVALID_RELIGION_CODE);
        }

        return religionMap.get(religion);
    }

    private SmokingStatus convertSmoking(String smoking) {
        Map<String, SmokingStatus> smokingMap = Map.of(
                "흡연", SmokingStatus.SMOKER,
                "비흡연", SmokingStatus.NON_SMOKER,
                "금연 흡연", SmokingStatus.QUITTING_SMOKING
        );

        if (!smokingMap.containsKey(smoking)) {
            throw new BadRequestException(ErrorMessage.INVALID_SMOKING_CODE);
        }

        return smokingMap.get(smoking);
    }

    private DrinkingFrequency convertDrinking(String drinking) {
        Map<String, DrinkingFrequency> drinkingMap = Map.of(
                "음주 안함", DrinkingFrequency.NO_DRINKING,
                "주 1~2회", DrinkingFrequency.ONCE_TWICE_PER_WEEK,
                "주 3~4회", DrinkingFrequency.THREE_FOUR_TIMES_PER_WEEK,
                "주 5회 이상", DrinkingFrequency.FIVE_TIMES_PER_WEEK
        );

        if (!drinkingMap.containsKey(drinking)) {
            throw new BadRequestException(ErrorMessage.INVALID_DRINKING_CODE);
        }

        return drinkingMap.get(drinking);
    }
}