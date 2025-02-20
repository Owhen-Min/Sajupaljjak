package com.saju.sajubackend.api.invite.service;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.repository.CoupleRepository;
import com.saju.sajubackend.api.invite.dto.InviteCreateResponseDto;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.repository.SajuRepository;
import com.saju.sajubackend.common.enums.Gender;
import com.saju.sajubackend.common.enums.RelationshipStatus;
import com.saju.sajubackend.common.exception.BadRequestException;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import com.saju.sajubackend.common.util.ElementCalculator;
import com.saju.sajubackend.common.util.ElementInfo;
import com.saju.sajubackend.common.util.InviteRedisUtil;
import com.saju.sajubackend.common.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class InviteService {
    private final InviteRedisUtil inviteRedisUtil;
    private final MemberRepository memberRepository;
    private final CoupleRepository coupleRepository;
    private final SajuRepository sajuRepository;

    @Transactional
    public InviteCreateResponseDto createInviteCode(Long memberId) {
        String code = inviteRedisUtil.findCodeByMemberId(memberId)
                .orElseGet(() -> {
                    String newCode = RandomUtil.generateRandomCode(8);
                    inviteRedisUtil.saveInvitationCode(memberId, newCode);
                    return newCode;
                });
        Long ttl = inviteRedisUtil.getTTL(memberId);
        return new InviteCreateResponseDto(code, ttl);
    }

    @Transactional
    public void createCouple(Long joinerId, String inviterCode, LocalDate startDate) {
        Long inviterId = inviteRedisUtil.findMemberIdByCode(inviterCode)
                .filter(id -> !id.equals(joinerId))
                .orElseThrow(() -> new BadRequestException(ErrorMessage.INVITE_CODE_NOT_FOUND));

        Member inviter = memberRepository.findById(inviterId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));
        Member joiner = memberRepository.findById(joinerId)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.MEMBER_NOT_FOUND));

        if (!isValidPair(inviter, joiner)) {
            throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_COUPLE_COMBINATION);
        }

        ElementInfo lackAndPlenty = getLackAndPlentyElement(inviter, joiner);

        Couple couple = Couple.builder()
                .coupleMale(inviter.getGender() == Gender.MALE ? inviter : joiner)
                .coupleFemale(inviter.getGender() == Gender.FEMALE ? inviter : joiner)
                .startDate(startDate)
                .lackElement(lackAndPlenty.lack())
                .plentyElement(lackAndPlenty.plenty())
                .build();

        inviter.updateRelationship(RelationshipStatus.COUPLE);
        joiner.updateRelationship(RelationshipStatus.COUPLE);

        coupleRepository.save(couple);

        inviteRedisUtil.deleteBothCode(inviterId, joinerId);
    }

    private boolean isValidPair(Member inviter, Member joiner) {
        return ((inviter.getGender() == Gender.MALE && joiner.getGender() == Gender.FEMALE) ||
                (inviter.getGender() == Gender.FEMALE && joiner.getGender() == Gender.MALE))
                && (inviter.getRelation() == null && joiner.getRelation() == null);
    }

    private ElementInfo getLackAndPlentyElement(Member inviter, Member joiner) {
        Saju inviterSaju = sajuRepository.findByMember(inviter)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.SAJU_NOT_FOUND));
        Saju joinerSaju = sajuRepository.findByMember(joiner)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.SAJU_NOT_FOUND));

        List<String> inviterSajuList = extractSajuElements(inviterSaju);
        List<String> joinerSajuList = extractSajuElements(joinerSaju);

        ElementInfo elementInfo = ElementCalculator.getLackAndPlentyElement(
                ElementCalculator.calculateElementCount(inviterSajuList),
                ElementCalculator.calculateElementCount(joinerSajuList));
        return elementInfo;
    }

    private List<String> extractSajuElements(Saju saju) {
        return Stream.of(saju.getTimely(), saju.getDaily(), saju.getMonthly(), saju.getYearly())
                .toList();
    }

    @Transactional(readOnly = true)
    public boolean confirmCouple(Long memberId) {
        return coupleRepository.existsByMemberId(memberId);
    }
}