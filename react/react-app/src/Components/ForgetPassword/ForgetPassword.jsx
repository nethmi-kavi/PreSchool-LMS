import React, { useState } from "react";
import axios from "axios";
import "./ForgetPassword.css";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/forget_Password/send-otp", null, {
        params: { email },
      });
      setMessage(response.data);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data || "Failed to send OTP");
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post("http://localhost:8080/forget_Password/reset", null, {
        params: { email, otp, newPassword },
      });
      setMessage(response.data);
      setStep(1); // Back to step 1 after success
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data || "Failed to reset password");
    }
  };

  return (
    <div className="container">
      <h2>Forget Password</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ForgetPassword;
