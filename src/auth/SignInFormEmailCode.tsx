import React, { useRef, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { SignInWithEmailCode } from "src/auth/SignInWithEmailCode";

function CodeInput({
  code,
  setCode,
}: {
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // only digits, max length 1
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 7) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").trim();
    if (/^\d{8}$/.test(pasted)) {
      e.preventDefault();
      const newCode = pasted.split("");
      setCode(newCode);
      setTimeout(() => inputsRef.current[7]?.focus(), 0);
    }
  };

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={2}>
      {code.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputsRef.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "1.25rem",
              width: "2.5rem",
              height: "3rem",
              backgroundColor: "#f3f3f3",
              borderRadius: "6px",
            },
          }}
          sx={{
            "& input": {
              p: 0,
            },
          }}
          variant="outlined"
        />
      ))}
    </Box>
  );
}

export function SignInFormEmailCode() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState<string[]>(Array(8).fill(""));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const fullCode = code.join("");

    try {
      const formData = new FormData();
      formData.append("code", fullCode);
      formData.append("email", (step as any).email);

      const result = await signIn("resend-otp", formData);

      if (result.signingIn) {
        window.location.href = "/";
      }
    } catch {
      // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ minHeight: "80vh" }}>
      <Grid item xs={12} sm={10} md={6}>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3 }}>
          <Stack spacing={3}>
            {step === "signIn" ? (
              <>
                <Typography variant="h5" fontWeight={600}>
                  PrimeTech Admin 
                </Typography>
                <SignInWithEmailCode handleCodeSent={(email) => setStep({ email })} />
              </>
            ) : (
              <>
                <Typography variant="h5" fontWeight={600}>
                  Check your email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter the 8-digit code we sent to your email address.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <CodeInput code={code} setCode={setCode} />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={submitting || code.includes("")}
                    >
                      {submitting ? "Signing in..." : "Continue"}
                    </Button>

                    <Button
                      type="button"
                      variant="text"
                      color="secondary"
                      fullWidth
                      onClick={() => setStep("signIn")}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
