package com.saju.sajubackend.api.matching.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class MatchingWrapper {

    List<MatchingMemberResponseDto> members = new ArrayList<>();

    public MatchingWrapper(List<MatchingMemberResponseDto> members) {
        this.members = members;
    }
}
