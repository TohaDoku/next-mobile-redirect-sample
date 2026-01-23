"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./PhoneRequestForm.module.css";

/**
 * Простая и надёжная валидация:
 * - берём только цифры
 * - длина 10..15 (международный диапазон)
 * - для RU (если начинается с 7/8) приводим к +7XXXXXXXXXX
 */
function normalizePhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (!digits) return { ok: false, value: "" };

  // RU: 8XXXXXXXXXX -> 7XXXXXXXXXX
  if (digits.length === 11 && digits.startsWith("8")) {
    return { ok: true, value: `+7${digits.slice(1)}` };
  }
  // RU: 7XXXXXXXXXX -> +7XXXXXXXXXX
  if (digits.length === 11 && digits.startsWith("7")) {
    return { ok: true, value: `+${digits}` };
  }

  // International: 10..15 digits -> +<digits>
  if (digits.length >= 10 && digits.length <= 15) {
    return { ok: true, value: `+${digits}` };
  }

  return { ok: false, value: "" };
}

export default function PhoneRequestForm({ buttonText = "Отправить", vuz }) {
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPage(window.location.href);
    }
  }, []);

  const validation = useMemo(() => normalizePhone(phone), [phone]);

  const showError = touched && !validation.ok;

  async function onSubmit(e) {
    e.preventDefault();
    setTouched(true);
    setServerError("");

    if (!validation.ok) return;

    const payload = {
      phone: validation.value,
      page,
      vuz: vuz || null,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `https://nikolskypomosh.ru/api/service-request-phone/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        let message = "Не удалось отправить заявку. Попробуйте ещё раз.";
        try {
          const data = await res.json();
          // если бэк присылает detail/message/errors
          message =
            data?.detail ||
            data?.message ||
            (Array.isArray(data?.errors) ? data.errors.join(", ") : "") ||
            message;
        } catch {}
        throw new Error(message);
      }

      setSuccess(true);
      setPhone("");
      setTouched(false);
    } catch (err) {
      setServerError(err?.message || "Ошибка отправки формы");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {success ? (
        <div className={styles.successBox} role="status">
          <div className={styles.successTitle}>Заявка отправлена ✅</div>
          <div className={styles.successText}>
            Мы свяжемся с вами в ближайшее время, чтобы уточнить дисциплину и
            подобрать репетитора.
          </div>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => setSuccess(false)}
          >
            Отправить ещё одну
          </button>
        </div>
      ) : (
        <>
          <label className={styles.label}>
            Номер телефона
            <div className={styles.inputWrap}>
              <input
                className={`${styles.input} ${showError ? styles.inputError : ""}`}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 999 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={showError ? "true" : "false"}
                aria-describedby={showError ? "phone-error" : undefined}
              />
            </div>
          </label>

          {showError && (
            <div className={styles.error} id="phone-error">
              Введите корректный номер (10–15 цифр).
            </div>
          )}

          {serverError && <div className={styles.error}>{serverError}</div>}

          <button
            className={styles.primaryBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : buttonText}
          </button>

          <div className={styles.hint}>
            Мы не спамим. Только уточним детали и предложим преподавателя.
          </div>
        </>
      )}
    </form>
  );
}
