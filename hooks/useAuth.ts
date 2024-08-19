import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
  const value = useContext(AuthContext);

  console.log('Context value:', value);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return value;
};
