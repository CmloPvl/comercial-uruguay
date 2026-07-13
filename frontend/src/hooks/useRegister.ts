import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";

export function useRegister() {
  const [error, setError] = useState<string>("");
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      termsAccepted: false, // ✅ NUEVO
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError("");

    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone || undefined,
        termsAccepted: data.termsAccepted, // ✅ NUEVO
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    error,
    isSubmitting,
  };
}