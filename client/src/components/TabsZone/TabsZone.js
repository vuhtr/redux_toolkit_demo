import React, { useState } from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    }
}

export default function TabsZone({
    orientation = "horizontal",
    scrollable = false,
    tabLabels,
    tabPanels,
}) {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <div className="tabs">
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: orientation === "horizontal" ? "column" : "row",
                }}
                className="tabs-zone__container"
            >
                <Tabs
                    orientation={orientation}
                    variant={scrollable ? "scrollable" : "standard"}
                    value={value}
                    onChange={handleChange}
                    sx={{ borderRight: 1, borderColor: "divider" }}
                >
                    {tabLabels.map((label, index) => (
                        <Tab
                            className="tabs-zone__label"
                            label={label}
                            key={index}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>

                {tabPanels.map((content, index) => (
                    <TabPanel key={index} className="tabs-zone__content" value={value} index={index}>
                        {content}
                    </TabPanel>
                ))}
            </Box>
        </div>
    )
}
