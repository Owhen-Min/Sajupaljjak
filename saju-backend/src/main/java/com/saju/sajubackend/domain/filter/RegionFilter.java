package com.saju.sajubackend.domain.filter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
    private Integer cityCode;

    @OneToOne
    @JoinColumn(name = "filter_id", nullable = false)
    private Filter filter;

    @Builder
    private RegionFilter(Long regionFilterId, Integer cityCode, Filter filter) {
        this.regionFilterId = regionFilterId;
        this.cityCode = cityCode;
        this.filter = filter;
    }
}
