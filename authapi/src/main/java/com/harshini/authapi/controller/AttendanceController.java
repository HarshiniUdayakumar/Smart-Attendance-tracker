package com.harshini.authapi.controller;

import com.harshini.authapi.entity.Attendance;
import com.harshini.authapi.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // MARK attendance
    @PostMapping("/mark")
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        return attendanceService.markAttendance(attendance);
    }

    // GET all attendance (history)
    @GetMapping("/all")
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    // GET today's attendance (FOR DASHBOARD)
    @GetMapping("/today")
    public List<Attendance> getTodayAttendance() {
        return attendanceService.getTodayAttendance();
    }
    @GetMapping("/date")
    public List<Attendance> getAttendanceByDate(@RequestParam String date) {
        return attendanceService.getByDate(LocalDate.parse(date));
    }
}