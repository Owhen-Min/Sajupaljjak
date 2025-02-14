package com.saju.sajubackend.api.matching.dto;

import com.saju.sajubackend.api.member.domain.Member;

public record MemberFilterResponse(Long memberId, String smoking, String drinking, String religion) {
    public static MemberFilterResponse from(Member member) {
        return new MemberFilterResponse(
                member.getMemberId(),
                member.getSmoking().getLabel(),
                member.getDrinking().getLabel(),
                member.getReligion().getLabel()
        );
    }
}
