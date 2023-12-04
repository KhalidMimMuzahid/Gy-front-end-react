import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { GiLaurelsTrophy } from "react-icons/gi";
const ColorGame = () => {
  // For Tabs
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='color_games_container'>
      {/* For Tabs */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Parity' value='1' />
              {/* <Tab label='Item Two' value='2' />
              <Tab label='Item Three' value='3' /> */}
              {/* More can be addded here */}
            </TabList>
          </Box>
          <TabPanel value='1'>
            <div className='top_content'>
              <div className='top_content_left'>
                <div className='title_with_icon'>
                  <GiLaurelsTrophy size={30} />
                  <p>Period</p>
                </div>
                <div className='amount'>
                  <h3>000000000</h3>
                </div>
              </div>
              <div className='top_content_right'>
                <div className='count-dwon-container'>
                  <p>Count Dwon</p>
                  <h3>0:00</h3>
                </div>
              </div>
            </div>
            <div className='game_body'>
              <div className='color-selectors'>
                <button className='green-button'>
                  <p>Join Green</p>
                </button>
                <button className='violet-button'>
                  <p>Join Violet</p>
                </button>
                <button className='red-button'>
                  <p>Join Red</p>
                </button>
              </div>
              <div className='color_button_container'>
                <button class='red-button'>
                  <p>1</p>
                </button>
                <button class='green-button'>
                  <p>2</p>
                </button>
                <button class='red-button'>
                  <p>3</p>
                </button>
                <button class='green-button'>
                  <p>4</p>
                </button>
                <button class='red-button'>
                  <p>5</p>
                </button>
              </div>
              <div className='color_button_container'>
                <button class='red-button'>
                  <p>6</p>
                </button>
                <button class='green-button'>
                  <p>7</p>
                </button>
                <button class='red-button'>
                  <p>8</p>
                </button>
                <button class='green-button'>
                  <p>9</p>
                </button>
                <button class='red-button'>
                  <p>10</p>
                </button>
              </div>
            </div>
            <div className='records_table'>
              <div className='table_header'>
                <p>Table Content goes here</p>
              </div>
            </div>
          </TabPanel>
          {/* More can be added Here */}
          {/* <TabPanel value='2'>Item Two</TabPanel>
          <TabPanel value='3'>Item Three</TabPanel> */}
        </TabContext>
      </Box>
    </div>
  );
};

export default ColorGame;
