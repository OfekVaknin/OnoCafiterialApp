import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ROLE, type UserRoleEnum } from "../../enums/UserRole.enum";
import type { User } from "../../types/User";
import { authManager } from "../../services/authManager";
import { authService } from "../../services/auth.service";
import TypographyText from "../../../../shared/TypographyText";
import BaseInput from "../../../../shared/BaseInput";
import BaseButton from "../../../../shared/BaseButton";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
  }>({
    name: "",
    email: "",
    password: "",
    role: USER_ROLE.Student,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    try {
      const newUser: User = {
        id: crypto.randomUUID(),
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        createdAt: new Date().toISOString(),
      };
      authService.register(newUser);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: "4rem" }}>
      <TypographyText variant="title">הרשמה</TypographyText>

      <BaseInput
        label="שם"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <BaseInput
        label="אימייל"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <BaseInput
        label="סיסמה"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      {error && (
        <TypographyText variant="caption" align="center" children={error} />
      )}

      <BaseButton fullWidth onClick={handleRegister}>
        הרשם
      </BaseButton>

      <TypographyText variant="caption" align="center" sx={{ mt: 2 }}>
        כבר יש לך חשבון? <a href="/login">התחבר</a>
      </TypographyText>
    </div>
  );
};

export default RegisterPage;
