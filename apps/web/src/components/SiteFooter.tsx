import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import type { Locale } from "../lib/locale";
import { translate } from "../lib/translation";

const commands = [
  "gh skill install sya-ri/spigot-event-list skills/spigot-event-search",
  "npx -y skills add sya-ri/spigot-event-list --skill spigot-event-search",
];

export default function SiteFooter({ locale }: { locale: Locale }) {
  const [message, setMessage] = useState("");
  const [supportOpen, setSupportOpen] = useState(false);
  const support = locale === "ja" ? "Ko-fi で支援" : "Support on Ko-fi";
  async function copy(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setMessage(translate(locale, "AiSkillCopied"));
    } catch {
      setMessage(translate(locale, "AiSkillCopyFailed"));
    }
  }
  return (
    <footer className="shell site-footer">
      <details onToggle={() => setMessage("")}>
        <summary>{translate(locale, "AiSkillTitle")}</summary>
        {commands.map((command) => (
          <p className="command" key={command}>
            <code>{command}</code>
            <button
              className="icon-button"
              type="button"
              aria-label={translate(locale, "AiSkillCopy")}
              onClick={() => void copy(command)}
            >
              <FiCopy />
            </button>
          </p>
        ))}
        <span role="status">{message}</span>
      </details>
      <div>
        <details className="support-panel" onToggle={(e) => setSupportOpen(e.currentTarget.open)}>
          <summary>{support}</summary>
          {supportOpen && (
            <iframe
              title={support}
              src="https://ko-fi.com/sya_ri/?hidefeed=true&widget=true&embed=true&preview=true"
            />
          )}
          <a href="https://ko-fi.com/sya_ri" target="_blank" rel="noopener noreferrer">
            ko-fi.com/sya_ri
          </a>
        </details>
        <a
          className="support-link"
          href="https://ko-fi.com/sya_ri"
          target="_blank"
          rel="noopener noreferrer"
        >
          {support}
        </a>
        <a href="https://github.com/sya-ri/spigot-event-list/blob/master/docs/development.md#i18n">
          {translate(locale, "AddNewLanguage")}
        </a>
        <a href="https://github.com/sya-ri">sya-ri</a>
      </div>
    </footer>
  );
}
