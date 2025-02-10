package com.saju.sajubackend.api.invite.service;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.repository.CoupleRepository;
import com.saju.sajubackend.api.invite.dto.InviteCreateResponseDto;
import com.saju.sajubackend.api.invite.repository.InviteRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.enums.Gender;
import com.saju.sajubackend.common.enums.RelationshipStatus;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InviteService {
    private final InviteRepository inviteRepository;
    private final MemberRepository memberRepository;
    private final CoupleRepository coupleRepository;

    @Transactional
    public InviteCreateResponseDto createInviteCode(Long memberId) {
        String code = inviteRepository.findCodeByMemberId(memberId)
                .orElseGet(() -> {
                    String newCode = RandomUtil.generateRandomCode(8);
                    inviteRepository.saveInvitationCode(memberId, newCode);
                    return newCode;
                });
        Long ttl = inviteRepository.getTTL(memberId);
        return new InviteCreateResponseDto(code, ttl);
    }

    @Transactional
    public void createCouple(Long joinerId, String inviterCode, LocalDateTime startDate) {
        Long inviterId = inviteRepository.findMemberIdByCode(inviterCode)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.INVITE_CODE_NOT_FOUND));

        Member inviter = memberRepository.findById(inviterId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));
        Member joiner = memberRepository.findById(joinerId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        if (!isValidGenderPair(inviter, joiner)) {
            throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_GENDER_COMBINATION);
        }

        Couple couple = Couple.builder()
                .coupleMale(inviter.getGender() == Gender.MALE ? inviter : joiner)
                .coupleFemale(inviter.getGender() == Gender.FEMALE ? inviter : joiner)
                .startDate(startDate)
                .build();

        inviter.updateRelationship(RelationshipStatus.COUPLE);
        joiner.updateRelationship(RelationshipStatus.COUPLE);

        coupleRepository.save(couple);

        inviteRepository.deleteBothCode(inviterId, joinerId);
    }

    private boolean isValidGenderPair(Member inviter, Member joiner) {
        return (inviter.getGender() == Gender.MALE && joiner.getGender() == Gender.FEMALE) ||
                (inviter.getGender() == Gender.FEMALE && joiner.getGender() == Gender.MALE);
    }
}