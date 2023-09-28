import { createContext } from 'react'
import { useState } from 'react'
import ReactSwitch from 'react-switch'
import './Toggle.css'
import'./App'

export const ThemeContext = createContext(null);

    // Toggle dark or light mode.
    function Toggle()  {
        const [theme, setTheme] = useState("dark");

        const toggleTheme = () => {
          setTheme((curr) => (curr === "light" ? "dark" : "light"));
        };
        return (
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="App" id={theme}>
              <div className="switch">
                <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
                <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
              </div>
            </div>
          </ThemeContext.Provider>
        );
      }
      export default Toggle