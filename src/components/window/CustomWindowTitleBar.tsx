import React, { useState } from "react";
import { Button, tokens } from "@fluentui/react-components";
import { SubtractRegular, SquareRegular, DismissRegular } from "@fluentui/react-icons";

const Titlebar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    window.electronAPI.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electronAPI.maximizeWindow();
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    window.electronAPI.closeWindow();
  };

  return (
    <div
      style={{
        WebkitAppRegion: "drag",
        height: "32px",
        width: "100%",
        backgroundColor: tokens.colorNeutralBackground2,
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: tokens.spacingHorizontalM,
        paddingRight: tokens.spacingHorizontalS,
        userSelect: "none",
        zIndex: 1000,
        position: "relative",
      } as React.CSSProperties}
    >
      <div style={{ 
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
      }}>
        Brush-Up
      </div>
      
      <div style={{ WebkitAppRegion: "no-drag", display: "flex" } as React.CSSProperties}>
        <Button
          appearance="subtle"
          size="small"
          icon={<SubtractRegular style={{width: "14px", height: "14px"}}/>}
          onClick={handleMinimize}
          style={{ 
            minWidth: "32px", 
            height: "24px",
            marginRight: "2px"
          }}
        />
        <Button
          appearance="subtle"
          size="small"
          icon={<SquareRegular style={{width: "14px", height: "14px"}}/>}
          onClick={handleMaximize}
          style={{ 
            minWidth: "32px", 
            height: "24px",
            marginRight: "2px"
          }}
        />
        <Button
          appearance="subtle"
          size="small"
          icon={<DismissRegular style={{width: "14px", height: "14px"}}/>}
          onClick={handleClose}
          style={{ 
            minWidth: "32px", 
            height: "24px"
          }}
        />
      </div>
    </div>
  );
};

export default Titlebar;
