package com.saju.sajubackend.api.saju.service;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.dto.SoloLifeDto;
import com.saju.sajubackend.api.saju.dto.SoloYearDto;
import com.saju.sajubackend.api.saju.entity.SoloLife;
import com.saju.sajubackend.api.saju.entity.SoloYear;
import com.saju.sajubackend.api.saju.repository.SajuRepository;
import com.saju.sajubackend.api.saju.repository.SoloLifeRepository;
import com.saju.sajubackend.api.saju.repository.SoloYearRepository;
import com.saju.sajubackend.common.exception.ErrorMessage;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FortuneService {

    private final SoloLifeRepository soloLifeRepository;
    private final SoloYearRepository soloYearRepository;
    private final SajuRepository sajuRepository;
    private final MemberRepository memberRepository;

    public SoloYearDto getNewYearFortune(Long memberId) {
        // Member 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException(ErrorMessage.MEMBER_NOT_FOUND.getMessage()));
        // 해당 회원의 Saju 정보를 DB에서 조회
        Saju saju = sajuRepository.findByMember(member)
                .orElseThrow(() -> new RuntimeException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL.getMessage()));

        // DB에서 siju와 ilju에 해당하는 운세 정보를 조회
        SoloYear fortune = soloYearRepository.findBySijuAndIlju(saju.getTimely(), saju.getDaily())
                .orElseThrow(() -> new EntityNotFoundException(
                        "No fortune found for siju: " + saju.getTimely() + " and ilju: " + saju.getDaily()));

        // 엔티티에서 필요한 값만 추출하여 DTO로 변환
        return new SoloYearDto(
                fortune.getSoloYearId(),
                fortune.getSiju(),
                fortune.getIlju(),
                fortune.getCharacteristic(),
                fortune.getFlow(),
                fortune.getDanger(),
                fortune.getAdvice()
        );
    }

    public SoloLifeDto getLifeTimeFortune(Long memberId) {
        // memberID로 해당하는 member 객체를 가져와서 getSiju, getIlju 해서 쓸 예정

        Saju saju = sajuRepository.getReferenceById(memberId);


        // DB에서 siju와 ilju에 해당하는 운세 정보를 조회
        SoloLife fortune = soloLifeRepository.findBySijuAndIlju(saju.getTimely(), saju.getDaily())
                .orElseThrow(() -> new EntityNotFoundException(
                        "No fortune found for siju: " + saju.getTimely() + " and ilju: " + saju.getDaily()));

        // 엔티티에서 필요한 값만 추출하여 DTO로 변환
        return new SoloLifeDto(
                fortune.getSoloLifeId(),
                fortune.getSiju(),
                fortune.getIlju(),
                fortune.getCharacteristic(),
                fortune.getFlow(),
                fortune.getDanger(),
                fortune.getAdvice()
        );
    }
}
