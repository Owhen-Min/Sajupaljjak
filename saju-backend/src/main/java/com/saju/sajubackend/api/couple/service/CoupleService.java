package com.saju.sajubackend.api.couple.service;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.dto.CoupleResponseDto;
import com.saju.sajubackend.api.couple.repository.CoupleRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CoupleService {

    private final CoupleRepository coupleRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public CoupleResponseDto getCouple(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));

        Couple couple = coupleRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.COUPLE_NOT_FOUND));

        return CoupleResponseDto.fromEntity(couple);
    }
}
