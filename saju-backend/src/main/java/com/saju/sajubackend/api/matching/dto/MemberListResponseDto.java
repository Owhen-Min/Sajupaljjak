package com.saju.sajubackend.api.matching.dto;

import com.saju.sajubackend.api.member.domain.Member;

import java.util.List;
import java.util.Map;

public record MemberListResponseDto(

        List<MatchingMemberResponseDto> members,
        boolean hasNext,
        long nextCursor

) {

    public static MemberListResponseDto fromEntity(Map<Member, Integer> members) {
        // 1. MatchingMemberResponseDto 리스트 변환
        List<MatchingMemberResponseDto> memberList = members.entrySet().stream()
                .map(entry -> MatchingMemberResponseDto.fromEntity(entry.getKey(), entry.getValue()))
                .toList();

        // 2. hasNext 계산
        boolean hasNext = hasNext(members);

        // 3. nextCursor 계산 (가장 마지막 멤버 ID)
        long nextCursor = hasNext ? members.keySet().stream()
                .mapToLong(Member::getMemberId)
                .max()
                .orElse(0L) : 0L;

        return new MemberListResponseDto(memberList, hasNext, nextCursor);
    }

    private static boolean hasNext(Map<Member, Integer> members) {
        return members.size() > 20;
    }
}
