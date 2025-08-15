import React, { useState } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";

export function SignInWithEmailCode({
  handleCodeSent,
  provider,
  children,
}: {
  handleCodeSent: (email: string) => void;
  provider?: string;
  children?: React.ReactNode;
}) {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData(event.currentTarget);

        try {
          await signIn(provider ?? "resend-otp", formData);
          handleCodeSent(formData.get("email") as string);
        } catch (error) {
          console.error(error);
          // Optionally show toast here
        } finally {
          setSubmitting(false);
        }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      <label
        htmlFor="email"
        style={{ fontWeight: 600, color: "#0d47a1", marginBottom: "0.25rem" }}
      >
        Email
      </label>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        style={{
          padding: "0.75rem 1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1.5px solid #90caf9",
          backgroundColor: "#e3f2fd",
          color: "#0d47a1",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#42a5f5";
          e.currentTarget.style.backgroundColor = "#bbdefb";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#90caf9";
          e.currentTarget.style.backgroundColor = "#e3f2fd";
        }}
      />

      {children}

      <Button
        type="submit"
        disabled={submitting}
        style={{
          backgroundColor: submitting ? "#90caf9" : "#42a5f5",
          color: "white",
          fontWeight: "600",
          padding: "0.75rem",
          borderRadius: "8px",
          cursor: submitting ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (!submitting) e.currentTarget.style.backgroundColor = "#1e88e5";
        }}
        onMouseLeave={(e) => {
          if (!submitting) e.currentTarget.style.backgroundColor = "#42a5f5";
        }}
      >
        {submitting ? "Sending..." : "Send code"}
      </Button>
    </form>
  );
}
