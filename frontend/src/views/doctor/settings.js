import React, { useState } from "react";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToggleNotifications = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  return (
    <div className={`container ${isDarkMode ? "dark" : ""}`}>
      <div className="settings-container">
        <h2 className="text-2xl font-semibold mb-6">Paramètres</h2>

        {/* Card 1: Theme */}
        <div className="settings-card">
          <h3 className="text-xl font-semibold mb-4">Apparence</h3>
          <div className="flex items-center mb-4">
            <label className="mr-3">Mode Sombre</label>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={handleToggleDarkMode}
              className="toggle-checkbox"
            />
          </div>
        </div>

        {/* Card 2: Notifications */}
        <div className="settings-card">
          <h3 className="text-xl font-semibold mb-4">Notifications</h3>
          <div className="flex items-center mb-4">
            <label className="mr-3">Activer les notifications</label>
            <input
              type="checkbox"
              checked={notificationEnabled}
              onChange={handleToggleNotifications}
              className="toggle-checkbox"
            />
          </div>
        </div>

        {/* Card 3: Privacy Settings */}
        <div className="settings-card">
          <h3 className="text-xl font-semibold mb-4">Confidentialité</h3>
          <div className="flex items-center mb-4">
            <label className="mr-3">Rendre mon profil privé</label>
            <input
              type="checkbox"
              className="toggle-checkbox"
            />
          </div>
        </div>

        {/* Save Settings Button */}
        <button className="save-btn">Sauvegarder les paramètres</button>
      </div>
    </div>
  );
};

export default Settings;
