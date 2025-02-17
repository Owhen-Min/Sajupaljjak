package com.saju.sajubackend.api.filter.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "REGION_FILTER")
public class RegionFilter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_filter_id")
    private Long regionFilterId;

    @Column(name = "city_code", nullable = false)
    private Long cityCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filter_id", nullable = false)
    private Filter filter;

    @Builder
    private RegionFilter(Long regionFilterId, Long cityCode, Filter filter) {
        this.regionFilterId = regionFilterId;
        this.cityCode = cityCode;
        this.filter = filter;
    }
}
