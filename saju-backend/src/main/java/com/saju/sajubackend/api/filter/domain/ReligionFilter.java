package com.saju.sajubackend.api.filter.domain;

import com.saju.sajubackend.common.converter.ReligionConverter;
import com.saju.sajubackend.common.enums.Religion;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "RELIGION_FILTER")
public class ReligionFilter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "religion_filter_id")
    private Long religionFilterId;

    @Convert(converter = ReligionConverter.class)
    @Column(nullable = false)
    private Religion religion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filter_id", nullable = false)
    private Filter filter;

    @Builder
    private ReligionFilter(Long religionFilterId, Religion religion, Filter filter) {
        this.religionFilterId = religionFilterId;
        this.religion = religion;
        this.filter = filter;
    }

    public void updateReligion(Religion religion) {
        this.religion = religion;
    }
}
