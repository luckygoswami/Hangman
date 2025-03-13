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
  const [isHiding, setIsHiding] = useState(false);

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

  const handleInstall = (): void => {
    deferredPrompt?.prompt();
    deferredPrompt?.userChoice.then((res) => {
      if (res.outcome == 'accepted') {
        setDeferredPrompt(null);
        setShowBanner(false);
      }
    });
  };

  const handleClose = (): void => {
    setIsHiding(true);

    setTimeout(() => {
      setShowBanner(false);
    }, 1000);
  };

  return showBanner ? (
    <div className={`install-banner ${isHiding ? 'hide' : ''}`}>
      <p>Install Hangman to play offline!</p>
      <div className="banner-actions">
        <button onClick={handleInstall}>Install</button>
        <span
          className="close-btn"
          onClick={handleClose}>
          ✖
        </span>
      </div>
    </div>
  ) : null;
};

export default InstallPrompt;
