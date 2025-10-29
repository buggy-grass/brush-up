import React, { useState } from "react";
import { Button, Image, tokens } from "@fluentui/react-components";
import { SubtractRegular, SquareRegular, DismissRegular } from "@fluentui/react-icons";
import AppIcon from '../../assets/app-icon/favicon.png'

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
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
      }}>
        <Image src={AppIcon} style={{width:"20px", height:"20px", marginRight: "3px"}}/>Brush-Up
      </div>

      <div style={{display:"flex", minWidth: "300px", color: "#c5c5c5", justifyContent: "center", height: "20px", border: "1px solid #404040", borderRadius: "5px", paddingRight: "50px", paddingLeft: "50px"}}>
        Project1.jpg
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
