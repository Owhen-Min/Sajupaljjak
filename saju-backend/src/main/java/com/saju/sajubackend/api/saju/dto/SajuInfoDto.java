package com.saju.sajubackend.api.saju.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SajuInfoDto (
    @JsonProperty(value="date")
    String daily,
    @JsonProperty(value="month")
    String monthly,
    @JsonProperty(value="time")
    String timely,
    @JsonProperty(value="year")
    String yearly
){}
