package com.saju.sajubackend.api.saju.service;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.repository.CoupleRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.dto.*;
import com.saju.sajubackend.api.saju.entity.CoupleLifeFortune;
import com.saju.sajubackend.api.saju.entity.CoupleYearFortune;
import com.saju.sajubackend.api.saju.entity.SoloLife;
import com.saju.sajubackend.api.saju.entity.SoloYear;
import com.saju.sajubackend.api.saju.repository.*;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FortuneService {

    private final SoloLifeRepository soloLifeRepository;
    private final SoloYearRepository soloYearRepository;
    private final SajuRepository sajuRepository;
    private final MemberRepository memberRepository;
    private final CoupleLifeRepository coupleLifeRepository;
    private final CoupleYearRepository coupleYearRepository;
    private final CoupleRepository coupleRepository;

    public SoloYearDto getNewYearFortune(Long memberId) {
        // Member 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));
        // 해당 회원의 Saju 정보를 DB에서 조회
        Saju saju = sajuRepository.findByMember(member)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));

        // DB에서 siju와 ilju에 해당하는 운세 정보를 조회
        SoloYear fortune = soloYearRepository.findBySijuAndIlju(saju.getTimely().substring(saju.getTimely().length() - 1), saju.getDaily())
                .orElseThrow(() -> new EntityNotFoundException(
                        "No fortune found for siju: " + saju.getTimely().substring(saju.getTimely().length() - 1) + " and ilju: " + saju.getDaily()));

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

    @Transactional
    public SoloLifeDto getLifeTimeFortune(Long memberId) {
        // memberID로 해당하는 member 객체를 가져와서 getSiju, getIlju 해서 쓸 예정

        Saju saju = sajuRepository.getReferenceById(memberId);


        // DB에서 siju와 ilju에 해당하는 운세 정보를 조회
        SoloLife fortune = soloLifeRepository.findBySijuAndIlju(saju.getTimely().substring(saju.getTimely().length() - 1), saju.getDaily())
                .orElseThrow(() -> new EntityNotFoundException(
                        "No fortune found for siju: " + saju.getTimely().substring(saju.getTimely().length() - 1) + " and ilju: " + saju.getDaily()));

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

    public SajuInfoDto getSajuInfo(Long memberId) {
        // Member 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));
        // 해당 회원의 Saju 정보를 DB에서 조회
        Saju saju = sajuRepository.findByMember(member)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));

        return new SajuInfoDto(
                saju.getDaily(),
                saju.getMonthly(),
                saju.getTimely(),
                saju.getYearly()
        );
    }

    public CoupleYearDto getCoupleNewYearFortune(Long memberId) {
        // 1. 회원(Member) 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));

//        // 2. 회원의 사주(Saju) 조회
//        Saju mySaju = sajuRepository.findByMember(member)
//                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));
//        // 3. 커플(Couple) 정보 조회
//        // 예시: 회원이 남성 혹은 여성으로 커플에 속할 수 있으므로 두 방식으로 조회합니다.
//
//        Couple couple;
//        if (member.getGender().equals(Gender.MALE)){
//            couple = coupleRepository.findByCoupleMale(member)
//                    .orElseThrow(() -> new RuntimeException("Member is not in a couple."));
//        } else if (member.getGender().equals(Gender.FEMALE)) {
//            couple = coupleRepository.findByCoupleFemale(member)
//                    .orElseThrow(() -> new RuntimeException("Member is not in a couple."));
//        }else {
//            throw new RuntimeException("Invalid gender for member: " + member.getGender());
//        }
//
//        Member partnerMember;
//        if (member.getGender().equals(Gender.MALE)) {
//            partnerMember = couple.getCoupleFemale();
//        } else {
//            partnerMember = couple.getCoupleMale();
//        }
//
//        Saju partnerSaju = sajuRepository.findByMember(partnerMember)
//                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));
//
//        // 6. 본인의 'timely' 값과 상대방의 'daily' 값을 이용하여 운세 조회
//        CoupleYearFortune coupleYearFortune = coupleYearRepository.findByMaleAndFemale(
//                        mySaju.getTimely(),
//                        partnerSaju.getDaily())
//                .orElseThrow(() -> new EntityNotFoundException(
//                        "No fortune found for siju: " + mySaju.getTimely()
//                                + " and ilju: " + partnerSaju.getDaily()));

        Couple couple = coupleRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.COUPLE_NOT_FOUND));

        Saju maleSaju = sajuRepository.findByMember(couple.getCoupleMale())
                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));
        Saju femaleSaju = sajuRepository.findByMember(couple.getCoupleFemale())
                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));

        CoupleYearFortune coupleYearFortune = coupleYearRepository.findByMaleAndFemale(
                        maleSaju.getDaily(), femaleSaju.getDaily())
                .orElseThrow(() -> new EntityNotFoundException(
                        "No fortune found for male: " + maleSaju.getDaily() + " and female: " + femaleSaju.getDaily()));

        // 7. DTO 변환 후 반환
        return CoupleYearDto.fromEntity(coupleYearFortune);
    }

    public CoupleLifeDto getCoupleLifeTimeFortune(Long memberId) {
        // 1. 회원(Member) 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));

//        // 2. 회원의 사주(Saju) 조회
//        Saju mySaju = sajuRepository.findByMember(member)
//                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));
//        // 3. 커플(Couple) 정보 조회
//        // 예시: 회원이 남성 혹은 여성으로 커플에 속할 수 있으므로 두 방식으로 조회합니다.
//
//        Couple couple;
//        if (member.getGender().equals(Gender.MALE)){
//            couple = coupleRepository.findByCoupleMale(member)
//                    .orElseThrow(() -> new RuntimeException("Member is not in a couple."));
//        } else if (member.getGender().equals(Gender.FEMALE)) {
//            couple = coupleRepository.findByCoupleFemale(member)
//                    .orElseThrow(() -> new RuntimeException("Member is not in a couple."));
//        }else {
//            throw new RuntimeException("Invalid gender for member: " + member.getGender());
//        }
//
//        Member partnerMember;
//        if (member.getGender().equals(Gender.MALE)) {
//            partnerMember = couple.getCoupleFemale();
//        } else {
//            partnerMember = couple.getCoupleMale();
//        }
//
//        Saju partnerSaju = sajuRepository.findByMember(partnerMember)
//                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));
//
//        // 6. 본인의 'timely' 값과 상대방의 'daily' 값을 이용하여 운세 조회
//        CoupleLifeFortune coupleLifeFortune = coupleLifeRepository.findByMaleAndFemale(
//                        mySaju.getTimely(),
//                        partnerSaju.getDaily())
//                .orElseThrow(() -> new EntityNotFoundException(
//                        "No fortune found for siju: " + mySaju.getTimely()
//                                + " and ilju: " + partnerSaju.getDaily()));
        Couple couple = coupleRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.COUPLE_NOT_FOUND));

        Saju maleSaju = sajuRepository.findByMember(couple.getCoupleMale())
                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));
        Saju femaleSaju = sajuRepository.findByMember(couple.getCoupleFemale())
                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_CELESTIAL_STEM_LABEL));

        CoupleLifeFortune coupleLifeFortune = coupleLifeRepository.findByMaleAndFemale(
                        maleSaju.getDaily(), femaleSaju.getDaily())
                .orElseThrow(() -> new EntityNotFoundException(
                        "No fortune found for male: " + maleSaju.getDaily() + " and female: " + femaleSaju.getDaily()));


        // 7. DTO 변환 후 반환
        return new CoupleLifeDto(
                coupleLifeFortune.getCoupleLifeId(),
                coupleLifeFortune.getMale(),
                coupleLifeFortune.getFemale(),
                coupleLifeFortune.getHarmony(),
                coupleLifeFortune.getChemi(),
                coupleLifeFortune.getGood(),
                coupleLifeFortune.getBad(),
                coupleLifeFortune.getAdvice()
        );
    }
}
