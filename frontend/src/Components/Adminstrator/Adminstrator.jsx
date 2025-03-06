import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import "./Administrator.scss";

const Administrator = () => {
    const [selectedTab, setSelectedTab] = useState("");
    const [selectedSubMenu, setSelectedSubMenu] = useState("");

    const browseMenu = [
        {
            category: "Support",
            icon: <SupportAgentIcon color="primary" />,
            total: 41,
            sub: [
                { subMenuItem: "Preparing", itemNumber: 7 },
                { subMenuItem: "Delivered", itemNumber: 8 },
                { subMenuItem: "Picked up", itemNumber: 5 },
                { subMenuItem: "Completed", itemNumber: 9 },
                { subMenuItem: "Canceled", itemNumber: 2 },
                { subMenuItem: "Closed", itemNumber: 7 },
            ],
        },
        {
            category: "Inquiries",
            icon: <MailIcon color="secondary" />,
            total: 6,
            sub: [{ subMenuItem: "Messages", itemNumber: 6 }],
        },
        {
            category: "New Inbox",
            icon: <InboxIcon color="action" />,
            total: 8,
            sub: [
                { subMenuItem: "Example", itemNumber: 0 },
                { subMenuItem: "Example 1", itemNumber: 5 },
                { subMenuItem: "Example 2", itemNumber: 3 },
            ],
        },
    ];

    const renderContent = () => {
        if (selectedSubMenu) {
            return (
                <Card>
                    <CardContent>
                        <Typography variant="h5">{selectedSubMenu}</Typography>
                        <Typography variant="body1">
                            Details about {selectedSubMenu} will be displayed here.
                        </Typography>
                    </CardContent>
                </Card>
            );
        }

        switch (selectedTab) {
            case "Support":
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Support Details</Typography>
                            <Typography>Here you can find support-related information.</Typography>
                        </CardContent>
                    </Card>
                );
            case "Inquiries":
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Inquiries</Typography>
                            <Typography>Here are your inquiries.</Typography>
                        </CardContent>
                    </Card>
                );
            case "New Inbox":
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="h5">New Inbox</Typography>
                            <Typography>Check your new messages here.</Typography>
                        </CardContent>
                    </Card>
                );
            default:
                return <Typography>Select a category to view details.</Typography>;
        }
    };

    return (
        <div className="administrator">
            <div className="administrator-main-container">
                <div className="left-column">
                    <Typography variant="h4" className="column-heading">
                        Welcome to Admin Portal
                    </Typography>
                    {browseMenu.map((item, idx) => (
                        <Accordion key={idx} className="menu-item">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                {item.icon} &nbsp;
                                <Typography onClick={() => setSelectedTab(item.category)}>
                                    {item.category} ({item.total})
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {item.sub.map((sub, i) => (
                                        <ListItem
                                            button
                                            key={i}
                                            onClick={() => setSelectedSubMenu(sub.subMenuItem)}
                                        >
                                            <ListItemText primary={`${sub.subMenuItem} (${sub.itemNumber})`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>

                <div className="content-area">{renderContent()}</div>
            </div>
        </div>
    );
};

export default Administrator;
