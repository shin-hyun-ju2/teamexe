import React, { useState } from "react";

const Login = () => {
  // State 관리: 이메일과 비밀번호
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본 동작 방지

    // 입력된 데이터 확인
    console.log("Email:", email);
    console.log("Password:", password);

    // 추가 작업: 서버로 데이터 전송 및 인증 처리
    // 예: fetch 또는 axios로 API 호출
  };

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* 이메일 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
            style={styles.input}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div style={styles.inputGroup}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
            style={styles.input}
          />
        </div>

        {/* 제출 버튼 */}
        <button type="submit" style={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
};

// 간단한 스타일링 객체
const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Login;
