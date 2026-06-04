package com.harshini.authapi.service;

import com.harshini.authapi.entity.Attendance;
import com.harshini.authapi.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    // Mark attendance (simple version for now)
    public Attendance markAttendance(Attendance attendance) {

        boolean exists = attendanceRepository
                .existsByStudentIdAndDate(attendance.getStudentId(), attendance.getDate());

        if (exists) {
            throw new RuntimeException("Attendance already marked for this student today");
        }

        return attendanceRepository.save(attendance);
    }

    // Get ALL attendance
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // GET TODAY attendance (REAL TIME DASHBOARD)
    public List<Attendance> getTodayAttendance() {
        return attendanceRepository.findByDate(LocalDate.now());
    }
    public List<Attendance> getByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }

}