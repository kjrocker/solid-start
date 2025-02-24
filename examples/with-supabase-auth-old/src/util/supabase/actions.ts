import { createClient } from "~/util/supabase/server";
import { action, json, redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { encodedRedirect } from "../utils";

export const signUpAction = action(async (formData: FormData) => {
  "use server";
  console.log("Form Data: ", formData)
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const event = getRequestEvent()!
  const supabase = createClient(event);
  const origin = event.request.headers.get("origin");

  if (!email || !password) {
    return new Error("Email and password are required");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
}, "signUpAction");

export const signInAction = action(async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const event = getRequestEvent()!
  const supabase = createClient(event);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
}, "signInAction");

export const forgotPasswordAction = action(async (formData: FormData) => {
  "use server";
  const email = formData.get("email")?.toString();
  const event = getRequestEvent()!
  const supabase = createClient(event);
  const origin = event.request.headers.get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
}, "forgotPasswordAction");

export const resetPasswordAction = action(async (formData: FormData) => {
  "use server";
  const event = getRequestEvent()!
  const supabase = createClient(event);

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
}, "resetPasswordAction");

export const signOutAction = action(async () => {
  "use server";
  const event = getRequestEvent()!
  const supabase = createClient(event);
  await supabase.auth.signOut();
  return redirect("/sign-in");
}, "signOutAction");
