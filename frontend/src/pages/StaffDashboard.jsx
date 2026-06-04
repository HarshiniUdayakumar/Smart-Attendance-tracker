import { useEffect, useState } from "react";
import API from "../api";
import "./StaffDashboard.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function StaffDashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [markedAttendance, setMarkedAttendance] = useState({});

  // ================= FETCH =================
  useEffect(() => {
    fetchStudents();
    fetchAttendanceByDate(selectedDate);
  }, [selectedDate]);

  const fetchStudents = async () => {
    const res = await API.get("/students/all");
    setStudents(res.data);
  };

  const fetchAttendanceByDate = async (date) => {
    const res = await API.get(`/attendance/date?date=${date}`);
    setAttendance(res.data);
  };

  // ================= ADD STUDENT =================
  const addStudent = async () => {
    await API.post("/students/add", {
      name,
      rollNumber,
      department,
    });

    setName("");
    setRollNumber("");
    setDepartment("");
    fetchStudents();
  };

  // ================= MARK =================
  const markAttendance = (studentId, status) => {
    setMarkedAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // ================= SAVE =================
  const saveAttendance = async () => {
    setLoading(true);

    const entries = Object.entries(markedAttendance);

    if (entries.length === 0) {
      alert("No attendance marked");
      setLoading(false);
      return;
    }

    for (let [studentId, status] of entries) {
      await API.post("/attendance/mark", {
        studentId: Number(studentId),
        date: selectedDate,
        status,
      });
    }

    alert("Saved Successfully ✔");
    setMarkedAttendance({});
    fetchAttendanceByDate(selectedDate);
    setLoading(false);
  };

  // ================= RECORD =================
  const getRecord = (studentId) => {
    return attendance
      .filter((a) => a.studentId === studentId)
      .sort((a, b) => b.id - a.id)[0];
  };

  // ================= PDF =================
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Daily Attendance Report", 14, 10);
    doc.text(`Date: ${selectedDate}`, 14, 18);

    const tableData = students.map((s) => {
      const record = getRecord(s.id);

      return [
        s.id,
        s.name,
        s.rollNumber,
        s.department,
        record ? record.status : "NOT MARKED",
      ];
    });

    autoTable(doc, {
      head: [["ID", "Name", "Roll", "Dept", "Attendance"]],
      body: tableData,
      startY: 25,
    });

    doc.save(`attendance_${selectedDate}.pdf`);
  };

  // ================= COUNTS =================
  const presentCount = students.filter((s) => {
    const r = getRecord(s.id);
    return r?.status === "PRESENT";
  }).length;

  const absentCount = students.filter((s) => {
    const r = getRecord(s.id);
    return r?.status === "ABSENT";
  }).length;

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Student Management System</h1>
        <p>Welcome Staff</p>
      </div>

      {/* DATE */}
      <div className="date-picker-card">
        <h3>Select Date</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* STATS */}
      <div className="stats-container">
        <div className="stat-card">
          <h2>{students.length}</h2>
          <p>Total</p>
        </div>
        <div className="stat-card">
          <h2>{presentCount}</h2>
          <p>Present</p>
        </div>
        <div className="stat-card">
          <h2>{absentCount}</h2>
          <p>Absent</p>
        </div>
      </div>

      {/* ADD STUDENT */}
      <div className="add-student-card">
        <h2>Add Student</h2>

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="Roll" />
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Dept" />

        <button onClick={addStudent}>Add</button>
      </div>

      {/* TABLE */}
      <div className="students-section">
        <h2>Students</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Roll</th><th>Dept</th><th>Attendance</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => {
              const record = getRecord(s.id);
              const temp = markedAttendance[s.id];

              return (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.rollNumber}</td>
                  <td>{s.department}</td>

                  <td>
                    {record ? (
                      <span className={record.status === "PRESENT" ? "status-present" : "status-absent"}>
                        {record.status}
                      </span>
                    ) : (
                      <div className="attendance-actions">
                        <button onClick={() => markAttendance(s.id, "PRESENT")}>✓ Present</button>
                        <button onClick={() => markAttendance(s.id, "ABSENT")}>✕ Absent</button>
                        {temp && <b>{temp}</b>}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* BUTTON GROUP (FIXED) */}
        <div className="button-group">
          <button className="pdf-btn" onClick={downloadPDF}>
            Download PDF
          </button>

          <button className="save-btn" onClick={saveAttendance} disabled={loading}>
            {loading ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;