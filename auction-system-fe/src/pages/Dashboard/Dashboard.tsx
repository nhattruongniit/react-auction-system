import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// components
import ListTable from "./components/ListTable";

// hooks
import { useAppContext } from "../../context/AppContext";

// services
import httpRequest from "../../services/httpRequest";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function Dashboard() {
  const [value, setValue] = React.useState(0);
  const [productCompleted, setProductCompleted] = React.useState([]);
  const [productOngoing, setProductOngoing] = React.useState([]);
  const { user } = useAppContext();

  React.useEffect(() => {
    httpRequest.get("/api/product").then((res) => {
      const { data } = res.data;
      setProductCompleted(
        data.filter((item: any) => item.status === "completed")
      );
      setProductOngoing(data.filter((item: any) => item.status === "new"));
    });
  }, []);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Ongoing" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <ListTable index={0} data={productOngoing} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListTable index={1} data={productCompleted} />
      </TabPanel>
    </Box>
  );
}

export default Dashboard;
