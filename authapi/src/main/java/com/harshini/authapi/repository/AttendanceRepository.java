package com.harshini.authapi.repository;

import com.harshini.authapi.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Get attendance for a specific date (TODAY)
    List<Attendance> findByDate(LocalDate date);

    // Check if student already marked today (IMPORTANT for next step)
    boolean existsByStudentIdAndDate(Long studentId, LocalDate date);
}