package com.saju.sajubackend.api.random.service;

import com.saju.sajubackend.api.chat.dto.WaitingDto;
import com.saju.sajubackend.api.chat.dto.request.ChattingRequestDto;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.repository.MemberRepository;
import com.saju.sajubackend.common.enums.MessageType;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.exception.NotFoundException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantReadWriteLock;

@RequiredArgsConstructor
@Service
public class RandomService {

    private final MemberRepository memberRepository;
    private final SimpMessagingTemplate messagingTemplate;

    private Deque<WaitingDto> waiting;
    private Map<Long, String> chatroomIds;
    private Map<Long, Member> partners;
    private Map<String, ScheduledExecutorService> schedulers;
    private Map<String, Integer> chatRoomNoticeCount;

    private ReentrantReadWriteLock lock;
    private Random random;

    private final String CHATROOM = "chatRoomId";

    @PostConstruct
    private void setUp() {
        this.waiting = new ArrayDeque<>(); // 순서 유지 필요
        this.chatroomIds = new ConcurrentHashMap<>(); // 멀티 스레드 환경 고려
        this.partners = new ConcurrentHashMap<>();
        this.schedulers = new ConcurrentHashMap<>();
        this.chatRoomNoticeCount = new ConcurrentHashMap<>();
        this.lock = new ReentrantReadWriteLock();
        this.random = new Random();
    }

    @Async("asyncThreadPool")
    public Member join(Long memberId, DeferredResult<Map<String, String>> deferredResult) {
        Member member = findMember(memberId);

        try {
            lock.writeLock().lock();
            waiting.offer(WaitingDto.builder() // 채팅 대기열에 등록
                    .member(member)
                    .deferredResult(deferredResult)
                    .build());
        } finally {
            lock.writeLock().unlock();
            matching();
        }

        return member;
    }

    public void delete(Member member) { // 대기열에서 삭제 (타임 아웃, 에러 발생 시)
        if (member == null) return;
        try {
            lock.writeLock().lock();
            waiting.removeIf(dto -> dto.getMember().getMemberId().equals(member.getMemberId()));
        } finally {
            lock.writeLock().unlock();
        }
    }

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));
    }

    private void matching() { // 랜덤 매칭

        try {
            lock.writeLock().lock(); // 락 걸기

            if (waiting.size() < 2) {
                return;
            }

            WaitingDto waiting1 = waiting.pollFirst();
            if (waiting1 == null) return;

            int idx = Math.min(random.nextInt(5), waiting.size()); // 랜덤 숫자 고르기

            // 1. 해당 인덱스의 상대 뽑기 (idx-1만큼 pollFirst -> offerLast)
            for (int i = 1; i < idx; i++) {
                waiting.offerLast(waiting.pollFirst());
            }

            WaitingDto waiting2 = waiting.pollFirst(); // 랜덤 상대 뽑기
            if (waiting2 == null) {
                waiting.offerFirst(waiting1);
                return;
            }

            // 2. 원래 순서로 만들기 (idx-1만큼 pollLast -> offerFirst)
            for (int i = 1; i < idx; i++) {
                waiting.offerFirst(waiting.pollLast());
            }

            createChatRoom(waiting1, waiting2);

        } finally {
            lock.writeLock().unlock();
        }
    }

    private void createChatRoom(WaitingDto waiting1, WaitingDto waiting2) {
        String chatroomId = UUID.randomUUID().toString();

        // 응답 반환
        waiting1.getDeferredResult().setResult(Map.of(CHATROOM, chatroomId));
        waiting2.getDeferredResult().setResult(Map.of(CHATROOM, chatroomId));

        // 채팅방 및 연결 정보 저장
        chatroomIds.put(waiting1.getMember().getMemberId(), chatroomId);
        chatroomIds.put(waiting2.getMember().getMemberId(), chatroomId);

        partners.put(waiting1.getMember().getMemberId(), waiting2.getMember());
        partners.put(waiting2.getMember().getMemberId(), waiting1.getMember());

        startScheduler(chatroomId, waiting1.getMember(), waiting2.getMember());
    }

    private void startScheduler(String chatroomId, Member member1, Member member2) {
        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        schedulers.put(chatroomId, scheduler);
        scheduler.scheduleAtFixedRate(() -> notice(chatroomId, member1, member2), 3, 1, TimeUnit.MINUTES);
    }

    private void notice(String chatroomId, Member member1, Member member2) {
        List<Map<Object, Object>> memberInfoList = getInfoList(member1, member2);

        int count = chatRoomNoticeCount.getOrDefault(chatroomId, 0); // 진행 상태 저장 (보낸 횟수)

        if (count >= 5) { // 5번 모두 보냈다면 스케줄러 종료
            stopScheduler(chatroomId);
            chatRoomNoticeCount.remove(chatroomId);
            return;
        }

        // 순서에 해당하는 정보 전송
        messagingTemplate.convertAndSend("/topic/random/" + chatroomId, memberInfoList.get(count));

        // 카운트 증가 후 저장
        chatRoomNoticeCount.put(chatroomId, count + 1);
    }

    private List<Map<Object, Object>> getInfoList(Member member1, Member member2) {
        return List.of(
                Map.of("messageType", MessageType.MEMBER_INFO.getLabel(), "field", "nickname", "member1Id", member1.getMemberId(), "member1Value", member1.getCelestialStem().getLabel(), "member2Id", member2.getMemberId(), "member2Value", member2.getCelestialStem().getLabel()),
                Map.of("messageType", MessageType.MEMBER_INFO.getLabel(), "field", "age", "member1Id", member1.getMemberId(), "member1Value", member1.getAge(), "member2Id", member2.getMemberId(), "member2Value", member2.getAge()),
                Map.of("messageType", MessageType.MEMBER_INFO.getLabel(), "field", "gender", "member1Id", member1.getMemberId(), "member1Value", member1.getGender().getLabel(), "member2Id", member2.getMemberId(), "member2Value", member2.getGender().getLabel()),
                Map.of("messageType", MessageType.MEMBER_INFO.getLabel(), "field", "name", "member1Id", member1.getMemberId(), "member1Value", member1.getNickname(), "member2Id", member2.getMemberId(), "member2Value", member2.getNickname()),
                Map.of("messageType", MessageType.MEMBER_INFO.getLabel(), "field", "profileImage", "member1Id", member1.getMemberId(), "member1Value", member1.getProfileImg(), "member2Id", member2.getMemberId(), "member2Value", member2.getProfileImg())
        );
    }

    private void stopScheduler(String chatroomId) {
        ScheduledExecutorService scheduler = schedulers.remove(chatroomId);

        if (scheduler != null) {
            scheduler.shutdown();
        }
    }

    public ChattingRequestDto send(ChattingRequestDto request) {
        return ChattingRequestDto.builder()
                .chatroomId(chatroomIds.get(request.getSenderId()))
                .content(request.getContent())
                .senderId(request.getSenderId())
                .messageType(request.getMessageType())
                .build();
    }
}
