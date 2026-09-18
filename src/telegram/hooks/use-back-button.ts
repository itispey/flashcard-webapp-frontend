import { backButton } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isRunningInTelegram } from "../TelegramProvider";

export function useBackButton() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRunningInTelegram() || !backButton.isSupported()) return;

    backButton.mount();
    backButton.show();

    const off = backButton.onClick(() => {
      navigate(-1);
    });

    return () => {
      off();
      backButton.hide();
    };
  }, [navigate]);
}
