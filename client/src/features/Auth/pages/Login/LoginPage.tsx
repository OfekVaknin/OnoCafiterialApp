import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import TypographyText from "../../../../shared/components/TypographyText";
import BaseInput from "../../../../shared/components/BaseInput";
import BaseButton from "../../../../shared/components/BaseButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await login(email, password);
      navigate("/"); // go to home or dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: "4rem" }}>
      <TypographyText variant="title">התחברות</TypographyText>

      <BaseInput
        label="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <BaseInput
        label="סיסמה"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <TypographyText variant="caption" align="center" children={error} />
      )}

      <BaseButton fullWidth onClick={handleSubmit}>
        התחבר
      </BaseButton>

      <TypographyText variant="caption" align="center" sx={{ mt: 2 }}>
        אין לך חשבון? <a href="/register">הרשם כאן</a>
      </TypographyText>
    </div>
  );
};

export default LoginPage;
