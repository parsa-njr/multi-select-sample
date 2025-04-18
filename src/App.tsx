import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MultiSelectDropdown } from "./components/MultiSelect";
// import { GraduationCap, FlaskConical, Palette, SoccerBall, Gamepad, Hospital } from "lucide-react";

function App() {


  const options= [
    { label: "Education", value: "education", icon: "🎓" },
    { label: "Yeeeah, science!", value: "science", icon: "🧪" },
    { label: "Art", value: "art", icon: "🎨" },
    { label: "Sport", value: "sport", icon: "⚽" },
    { label: "Games", value: "games", icon: "🎮" },
    { label: "Health", value: "health", icon: "🏥" },
  ];


  return (
    <>
    <div className="selectContainer" >
      <MultiSelectDropdown
        options={options}
        onChange={(val) => {
          console.log("selected item's :: ", val);
        }}
      />

    </div>
    </>
  );
}

export default App;
