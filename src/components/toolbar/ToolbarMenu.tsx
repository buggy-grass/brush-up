import { Stack } from "@fluentui/react";
import {
  Button,
  Image,
  makeStyles,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  DismissRegular,
  DocumentFolderColor,
  FolderOpenFilled,
  HistoryColor,
  PrintFilled,
  SaveEditFilled,
  SaveFilled,
  ShareIosColor,
} from "@fluentui/react-icons";
import PrinterIcon from "../../assets/printer.png";
import SaveIcon from "../../assets/save.png";
import SaveAsIcon from "../../assets/saveas.png";
import React from "react";

const useStyles = makeStyles({
  menuIcon: {
    width: "20px",
    height: "20px",
  },
});

function ToolbarMenu() {
    const styles = useStyles();
  return (
    <Stack style={{ height: "40px", borderBottom: "1px solid #383838" }}>
      <Stack.Item
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100px",
          paddingLeft: "10px",
        }}
      >
        <Menu positioning={{ autoSize: true }}>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle" style={{ width: "auto" }}>
              File
            </Button>
          </MenuTrigger>

          <MenuPopover style={{ minWidth: "300px" }}>
            <MenuList>
              <MenuItem
                icon={<DocumentFolderColor />}
                secondaryContent="CTRL + N"
              >
                New
              </MenuItem>
              <MenuItem
                icon={<FolderOpenFilled color="#FFD638" />}
                secondaryContent="CTRL + O"
              >
                Open
              </MenuItem>
              <MenuItem icon={<HistoryColor />} secondaryContent="CTRL + R">
                Recent
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<Image src={SaveIcon} className={styles.menuIcon} />}
                secondaryContent="CTRL + S"
              >
                Save
              </MenuItem>
              <MenuItem
                icon={<Image src={SaveAsIcon} className={styles.menuIcon} />}
                secondaryContent="F12"
              >
                Save As
              </MenuItem>
              <MenuItem
                icon={<Image src={PrinterIcon} className={styles.menuIcon} />}
                secondaryContent="CTRL + P"
              >
                Print
              </MenuItem>
              <MenuItem icon={<ShareIosColor />} secondaryContent="CTRL + 1">
                Share
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<DismissRegular />} secondaryContent="Alt + F4">
                Exit
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu positioning={{ autoSize: true }}>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle">Edit</Button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
              <MenuItem disabled>Open File</MenuItem>
              <MenuItem>Open Folder</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu positioning={{ autoSize: true }}>
          <MenuTrigger disableButtonEnhancement>
            <Button appearance="subtle">View</Button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
              <MenuItem disabled>Open File</MenuItem>
              <MenuItem>Open Folder</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </Stack.Item>
    </Stack>
  );
}

export default ToolbarMenu;
