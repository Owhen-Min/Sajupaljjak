package com.saju.sajubackend.api.saju.service;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.couple.repository.CoupleRepository;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.api.saju.domain.Saju;
import com.saju.sajubackend.api.saju.repository.SajuRepository;
import com.saju.sajubackend.common.enums.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;



import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SajuServiceTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CoupleRepository coupleRepository;

    @Autowired
    private SajuRepository sajuRepository;

    private Member male;
    private Member female;
    private Couple couple;
    private Saju maleSaju;
    private Saju femaleSaju;

    @Test
    void testMemberCreation() {
        Member male = Member.builder()
                .bday(LocalDate.of(1995, 6, 10))
                .btime(LocalDateTime.of(1995, 6, 10, 8, 30))
                .relation(RelationshipStatus.COUPLE)
                .nickname("Alex")
                .intro("Hi, I am Alex!")
                .profileImg("https://example.com/profile1.jpg")
                .height(180)
                .cityCode(110)
                .age(28)
                .smoking(SmokingStatus.NON_SMOKER)
                .drinking(DrinkingFrequency.NO_DRINKING)
                .religion(Religion.NONE)
                .gender(Gender.MALE)
                .celestialStem(CelestialStem.GYEONG_GUM)
                .build();

        // 2. 여자 회원 생성
        Member female = Member.builder()
                .bday(LocalDate.of(1997, 9, 20))
                .btime(LocalDateTime.of(1997, 9, 20, 15, 45))
                .relation(RelationshipStatus.COUPLE)
                .nickname("Emma")
                .intro("Hello, I am Emma!")
                .profileImg("https://example.com/profile2.jpg")
                .height(165)
                .cityCode(210)
                .age(26)
                .smoking(SmokingStatus.NON_SMOKER)
                .drinking(DrinkingFrequency.NO_DRINKING)
                .religion(Religion.NONE)
                .gender(Gender.FEMALE)
                .celestialStem(CelestialStem.EUL_MOK)
                .build();

        // 3. 회원 저장
        male = memberRepository.save(male);
        female = memberRepository.save(female);

        // 4. 커플 관계 생성
        Couple couple = Couple.builder()
                .coupleMale(male)
                .coupleFemale(female)
                .startDate(LocalDateTime.of(2023, 1, 1, 0, 0))
                .build();

        // 5. 커플 저장
        coupleRepository.save(couple);

        // 6. 남자 회원 사주 생성
        Saju maleSaju = Saju.builder()
                .member(male)
                .daily("병신")
                .monthly("신미")
                .yearly("계사")
                .timely("신사")
                .build();

        // 7. 여자 회원 사주 생성
        Saju femaleSaju = Saju.builder()
                .member(female)
                .daily("병신")
                .monthly("신미")
                .yearly("계사")
                .timely("신사")
                .build();

        // 8. 사주 저장
        sajuRepository.save(maleSaju);
        sajuRepository.save(femaleSaju);
        assertThat(memberRepository.count()).isEqualTo(2);
        assertThat(memberRepository.findById(male.getMemberId())).isPresent();
        assertThat(memberRepository.findById(female.getMemberId())).isPresent();
    }
}
