package com.saju.sajubackend.api.chat.repository;

import com.saju.sajubackend.api.chat.domain.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {
}
