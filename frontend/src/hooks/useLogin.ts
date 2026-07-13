import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

export function useLogin() {
  const [error, setError] = useState<string>("");
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRemember(true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    try {
      if (remember) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      // ✅ Si el login falla, el catch se ejecuta y no navega
      await login(data.email, data.password);
      
      // ✅ Solo navega si el login fue exitoso
      navigate("/perfil");
    } catch (err: any) {
      setError(err.message || "Credenciales incorrectas");
      console.error("Login error:", err);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    error,
    isSubmitting,
    remember,
    setRemember,
  };
}