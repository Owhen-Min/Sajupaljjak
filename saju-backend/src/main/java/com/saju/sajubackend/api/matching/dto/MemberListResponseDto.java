package com.saju.sajubackend.api.matching.dto;

import com.saju.sajubackend.api.member.domain.Member;

import java.util.List;
import java.util.Map;

public record MemberListResponseDto(

        List<MatchingMemberResponseDto> members,
        boolean hasNext,
        int nextCursor,

) {

    public static MemberListResponseDto fromEntity(List<Member> members, Map<Integer, Integer> scores) {
        return new MemberListResponseDto(
                members.stream()
                        .map(member -> MatchingMemberResponseDto.fromEntity(member, scores.get(member.getCelestialStem().getCode())))
                        .toList(),
                members.size() > 20
        )

    }
}
