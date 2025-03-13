import React, { useEffect, useState } from 'react';
import '../styles/InstallPrompt.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

localStorage.getItem('installPromptCount')
  ? localStorage.setItem(
      'installPromptCount',
      String(Number(localStorage.getItem('installPromptCount')) + 1)
    )
  : localStorage.setItem('installPromptCount', '1');

let installPromptCount: number = Number(
  localStorage.getItem('installPromptCount')
);

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      (installPromptCount % 3 == 0 || installPromptCount == 1) &&
        setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler
      );
    };
  }, []);

  const handleInstallClick = (): void => {
    deferredPrompt?.prompt();
    deferredPrompt?.userChoice.then(() => {
      setDeferredPrompt(null);
      setShowBanner(false);
    });
  };

  return showBanner ? (
    <div className="install-banner">
      <p>Install Hangman to play offline!</p>
      <div className="banner-actions">
        <button onClick={handleInstallClick}>Install</button>
        <span
          className="close-btn"
          onClick={() => setShowBanner(false)}>
          ✖
        </span>
      </div>
    </div>
  ) : null;
};

export default InstallPrompt;
