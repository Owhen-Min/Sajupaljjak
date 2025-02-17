package com.saju.sajubackend.api.chat.repository;

import com.saju.sajubackend.api.chat.domain.ChatroomMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatroomMemberRespository extends JpaRepository<ChatroomMember, Long> {
}
