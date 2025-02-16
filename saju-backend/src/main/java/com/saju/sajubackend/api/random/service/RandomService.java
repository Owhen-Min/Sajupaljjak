package com.saju.sajubackend.api.random.service;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import jakarta.annotation.PostConstruct;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

@RequiredArgsConstructor
@Service
public class RandomService {

    private Deque<Map<String, Object>> waiting;
    private Map<String, String> connected;
    private ReentrantReadWriteLock lock;
    private Random random;
    private final MemberRepository memberRepository;
    private final String MEMBER = "member";
    private final String DEFERRED_RESULT = "deferredResult";
    private final String CHATROOM = "chatRoomId";

    @PostConstruct
    private void setUp() {
        this.waiting = new ArrayDeque<>(); // 순서 유지 필요
        this.connected = new ConcurrentHashMap<>(); // 멀티 스레드 환경 고려
        this.lock = new ReentrantReadWriteLock();
        random = new Random();
    }

    @Async("asyncThreadPool")
    public Member join(Long memberId, DeferredResult deferredResult) {
        Member member = findMember(memberId);

        try {
            lock.writeLock().lock();
            waiting.offer(Map.of(MEMBER, member, DEFERRED_RESULT, deferredResult)); // 채팅 대기열에 등록
        } finally {
            lock.writeLock().unlock();
            matching();
        }

        return member;
    }

    public void delete(Member member) {

    }

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));
    }

    private void matching() {

        if (waiting.size() < 2) {
            return;
        }

        try {
            lock.writeLock().lock(); // 락 걸기

            Map<String, Object> member1 = waiting.pollFirst();

            int idx = Math.max(random.nextInt(5), waiting.size()); // 랜덤 숫자 고르기

            // 1. 해당 인덱스의 상대 뽑기 (idx-1만큼 pollFirst -> offerLast)
            for (int i = 1; i < idx; i++) {
                waiting.offerLast(waiting.pollFirst());
            }

            Map<String, Object> member2 = waiting.pollFirst(); // 랜덤 상대 뽑기

            // 2. 원래 순서로 만들기 (idx-1만큼 pollLast -> offerFirst)
            for (int i = 1; i < idx; i++) {
                waiting.offerFirst(waiting.pollLast());
            }

            String chatroomId = UUID.randomUUID().toString(); // 채팅방 아이디

            DeferredResult response1 = (DeferredResult) member1.get(DEFERRED_RESULT);
            DeferredResult response2 = (DeferredResult) member2.get(DEFERRED_RESULT);

            response1.setResult(Map.of(CHATROOM, chatroomId));
            response2.setResult(Map.of(CHATROOM, chatroomId));

            // connected에 추가하기

        } finally {
            lock.writeLock().unlock();
        }
    }
}
