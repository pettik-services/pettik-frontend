import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    variant='fullWidth'
    className='w-full md:w-[40%] font-bold'
    TabIndicatorProps={{ hidden: true}}
  />
))({
  "& .MuiTabs-indicator": {
    height: "0%",
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
});

export function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface StyledTabProps {
  label: string;
}

export const StyledTab = styled((props: StyledTabProps) => {
  return <Tab disableRipple {...props} />;
})(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: 550,
  fontSize: theme.typography.pxToRem(15),
  padding: 0,
  alignItems: 'start',
  color: "rgba(71, 71, 71, 0.7)",
  "&.Mui-selected": {
    color: "#EDB506",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#EDB506",
  },
}));