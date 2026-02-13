export const YM_ID = 106626466;

function waitForYm(timeoutMs = 1500) {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (typeof window.ym === "function") return resolve(true);

    const started = Date.now();
    const tick = () => {
      if (typeof window.ym === "function") return resolve(true);
      if (Date.now() - started >= timeoutMs) return resolve(false);
      setTimeout(tick, 50);
    };
    tick();
  });
}

export async function reachGoal(goalName, params) {
  try {
    if (typeof window === "undefined") return false;

    const ok = await waitForYm();
    if (!ok || typeof window.ym !== "function") return false;

    window.ym(YM_ID, "reachGoal", goalName, params || {});
    return true;
  } catch {
    return false;
  }
}

/**
 * Для внешних ссылок: отправляем цель и только потом уводим пользователя.
 * Используем callback Метрики + fallback таймер.
 */
export async function reachGoalAndNavigate(goalName, navigate, timeoutMs = 300) {
  if (typeof window === "undefined") return navigate();

  const ok = await waitForYm();
  if (!ok || typeof window.ym !== "function") return navigate();

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    navigate();
  };

  window.ym(YM_ID, "reachGoal", goalName, {}, finish);
  setTimeout(finish, timeoutMs);
}
