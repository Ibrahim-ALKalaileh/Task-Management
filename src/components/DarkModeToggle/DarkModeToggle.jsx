import { useContext } from "react";
import { DarkModeContext } from "../../util/DarkModeContext";
import "./DarkModeToggle.css";
const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div onClick={toggleDarkMode}
    className={`toggle-switch ${isDarkMode ? 'night':'day'}`}>
      <div className="switch"></div>
      <div className="sun">☀️</div>
      <div className="cloud">☁️</div>
      <div className="moon">🌙</div>
      <div className="stars">✨</div>
    </div>
  );
};

export default DarkModeToggle;