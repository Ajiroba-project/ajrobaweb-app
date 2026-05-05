"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { HiArrowLongLeft } from "react-icons/hi2";
import { toast } from "react-toastify";
import Brand from "../asset/logo.svg";
import { DefaultButton } from "../component/Button";
import { HeroSubText } from "../component/AuthHero";

const schema = yup.object({
  newPin: yup
    .string()
    .required("PIN is required")
    .matches(/^\d{6}$/, "Enter exactly 6 digits"),
  confirmPin: yup
    .string()
    .required("Confirm your PIN")
    .oneOf([yup.ref("newPin")], "PINs must match"),
});

type FormValues = yup.InferType<typeof schema>;

function errorMessageFromResetPinJson(json: Record<string, unknown>): string {
  if (typeof json.message === "string") return json.message;
  const data = json.data;
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (typeof o.message === "string") return o.message;
    if (o.detail != null) {
      const d = o.detail;
      if (Array.isArray(d) && d[0] != null) return String(d[0]);
      return String(d);
    }
  }
  return "Could not reset PIN. The link may have expired.";
}

function ResetPinForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: { newPin: "", confirmPin: "" },
  });

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      toast.error("This link is invalid or incomplete. Open the link from your email.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/reset-wallet-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_pin: values.newPin,
        }),
      });

      const json = (await response.json()) as Record<string, unknown>;

      if (response.ok) {
        reset();
        setSuccessOpen(true);
        return;
      }

      toast.error(errorMessageFromResetPinJson(json));
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const invalidLink = !token;

  const inputClass =
    "h-auto w-full rounded-lg border p-2.5 font-Inter text-sm font-normal focus:outline-none pr-10";

  return (
    <>
      <div className="content-container px-4">
        <nav className="Brand-logo flex justify-center px-7 py-4 sm:p-6 md:block lg:block lg:px-14 xl:block 2xl:block">
          <Link href="/">
            <Image src={Brand} alt="brand-logo" priority />
          </Link>
        </nav>

        <div className="flex min-h-0 flex-col items-center sm:min-h-[80vh] sm:justify-center">
          <HeroSubText
            title="Reset Pin"
            menu="Kindly enter your new wallet pin"
          />

          <div className="mb-10 flex w-full justify-center sm:mb-20">
            {invalidLink ? (
              <div className="w-full max-w-sm p-4 text-center md:p-8">
                <p className="text-sm text-red-700">
                  This page needs a valid link from your email. Check your inbox or contact
                  support.
                </p>
                <div className="mt-8 flex cursor-pointer items-center justify-center">
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 text-sm text-[#353131]"
                  >
                    <HiArrowLongLeft />
                    <span>Back to sign in</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm p-4 md:p-8"
              >
                <div className="mt-4 grid grid-cols-1 gap-8">
                  <div className="flex flex-col">
                    <div className="mb-1 flex items-baseline justify-between gap-2">
                      <label className="text-sm" htmlFor="newPin">
                        New Pin
                      </label>
                      <span className="text-xs text-[#F25E26]">6 digits pin</span>
                    </div>
                    <Controller
                      name="newPin"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            id="newPin"
                            type={showNew ? "text" : "password"}
                            inputMode="numeric"
                            autoComplete="new-password"
                            maxLength={6}
                            placeholder="••••••"
                            className={inputClass}
                            {...field}
                          />
                          <div
                            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-sm leading-5"
                            onClick={() => setShowNew((v) => !v)}
                          >
                            {showNew ? <FaRegEyeSlash /> : <FaRegEye />}
                          </div>
                        </div>
                      )}
                    />
                    <div className="text-xs text-red-700">{errors.newPin?.message}</div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm" htmlFor="confirmPin">
                      Confirm New Pin
                    </label>
                    <Controller
                      name="confirmPin"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            id="confirmPin"
                            type={showConfirm ? "text" : "password"}
                            inputMode="numeric"
                            autoComplete="new-password"
                            maxLength={6}
                            placeholder="••••••"
                            className={inputClass}
                            {...field}
                          />
                          <div
                            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-sm leading-5"
                            onClick={() => setShowConfirm((v) => !v)}
                          >
                            {showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
                          </div>
                        </div>
                      )}
                    />
                    <div className="text-xs text-red-700">{errors.confirmPin?.message}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <DefaultButton
                    type="submit"
                    disabled={submitting}
                    text={submitting ? "loading..." : "Reset"}
                    className="h-10 w-full rounded-lg bg-[#FCDFD4] text-sm hover:bg-[#E84526] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 text-sm text-[#353131]"
                  >
                    <HiArrowLongLeft />
                    <span>Back to sign in</span>
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {successOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-pin-success-title"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex justify-center">
              <Image src={Brand} alt="Ajroba" width={120} height={40} />
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F25E26]">
                <svg
                  className="h-9 w-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2
                id="reset-pin-success-title"
                className="text-2xl font-bold text-gray-900"
              >
                Successful!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                You have successfully reset your wallet pin
              </p>
              <DefaultButton
                type="button"
                text="Proceed to Home"
                handleClick={() => {
                  setSuccessOpen(false);
                  router.push("/");
                }}
                className="mt-8 h-10 w-full rounded-lg bg-[#FCDFD4] text-sm hover:bg-[#E84526] hover:text-white"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ResetPinPage() {
  return (
    <Suspense
      fallback={
        <div className="content-container flex min-h-[50vh] items-center justify-center px-4 text-[#353131]">
          Loading…
        </div>
      }
    >
      <ResetPinForm />
    </Suspense>
  );
}
