package com.saju.sajubackend.api.member.service;

import com.saju.sajubackend.api.matching.dto.MemberFilterRequest;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 예제에서는 id가 1인 회원을 조회합니다.
    public Member getMember(Long memberId) {
        return memberRepository.findById(4L)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public void updateMemberFilter(Long memberId, MemberFilterRequest request) {
        Member member = getMember(memberId);
        member.updateSmoking(SmokingStatus.fromLabel(request.smoking()));
        member.updateDrinking(DrinkingFrequency.fromLabel(request.drinking()));
        member.updateReligion(Religion.fromLabel(request.religion()));
        memberRepository.save(member);
    }

}
