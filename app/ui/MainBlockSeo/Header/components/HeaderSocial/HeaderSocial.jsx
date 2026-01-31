"use client";

import styles from "./HeaderSocial.module.css";
import { FaVk, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { reachGoalAndNavigate } from "../../../ym";

function handleOutboundClick(e, goalName) {
  // Ctrl/Meta/Shift/колесо мыши — не мешаем
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;

  e.preventDefault();

  const a = e.currentTarget;
  const href = a.getAttribute("href") || "/";
  const target = a.getAttribute("target");

  reachGoalAndNavigate(goalName, () => {
    if (target === "_blank") {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  });
}

export default function HeaderSocial({ header, headerText }) {
  return (
    <div>
      <div className={styles.socialWrapper}>
        {headerText && <h3>Напишите нам</h3>}
        <span className={styles.socialServices}>
          <a
            className={styles.socialServicesTg}
            href="https://t.me/nikolsky_education"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            onClick={(e) => handleOutboundClick(e, "tg_conversion")}
          >
            <FaTelegramPlane />
          </a>

          <a
            className={styles.socialServicesWa}
            href="https://wa.me/79950377157"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            onClick={(e) => handleOutboundClick(e, "wa_conversion")}
          >
            <FaWhatsapp />
          </a>

          <a
            className={styles.socialServicesVk}
            href="https://vk.me/club185766895"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VK"
            onClick={(e) => handleOutboundClick(e, "vk_conversion")}
          >
            <FaVk />
          </a>

          <a
            className={styles.socialServicesMax}
            href="https://max.ru/id360408448437_bot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Max"
            onClick={(e) => handleOutboundClick(e, "max_conversion")}
          >
            <Image src="/max.png" alt="Max" width={54} height={54} />
          </a>
        </span>
      </div>

      <div>{header}</div>
    </div>
  );
}
