import React, { useState } from 'react'
import './Adminstrator.scss'

const Adminstrator = () => {
    const [selectedTab, setSelectedTab] = useState("")
    const [selectedSubMenu, setSelectedSubMenu] = useState("")

    const browseMenu = [
        {
            category: "Support",
            total: 41,
            sub: [
                { subMenuItem: "Preparing", itemNumber: 7 },
                { subMenuItem: "Delivered", itemNumber: 8 },
                { subMenuItem: "Picked up", itemNumber: 5 },
                { subMenuItem: "Completed", itemNumber: 9 },
                { subMenuItem: "Canceled", itemNumber: 2 },
                { subMenuItem: "Closed", itemNumber: 7 }
            ]
        },
        {
            category: "Inquiries",
            total: 6,
            sub: [
                { subMenuItem: "Messages", itemNumber: 6 },
            ]
        },
        {
            category: "New Inbox",
            total: 8,
            sub: [
                { subMenuItem: "Example", itemNumber: 0 },
                { subMenuItem: "Example 1", itemNumber: 5 },
                { subMenuItem: "Example 2", itemNumber: 3 }
            ]
        }
    ]

    const renderContent = () => {
        if (selectedSubMenu) {
            return (
                <div>
                    <h3>{selectedSubMenu}</h3>
                    <p>Details about {selectedSubMenu} will be displayed here.</p>
                </div>
            );
        }

        switch (selectedTab) {
            case "Support":
                return (
                    <div>
                        <h3>Support Details</h3>
                        <p>Here you can find support-related information.</p>
                    </div>
                );
            case "Inquiries":
                return (
                    <div>
                        <h3>Inquiries</h3>
                        <p>Here are your inquiries.</p>
                    </div>
                );
            case "New Inbox":
                return (
                    <div>
                        <h3>New Inbox</h3>
                        <p>Check your new messages here.</p>
                    </div>
                );
            default:
                return <p>Please select a category to view details.</p>;
        }
    };

    return (
        <div className="administrator">
            <div className="administrator-main-container">
                <div className="left-column">
                    <h2 className="column-heading">Browse</h2>
                    <div className="vertical-menu">
                        {browseMenu.map((item, idx) => (
                            <div key={idx} className="menu-item">
                                <a href="#" className="highlight" onClick={() => {
                                    setSelectedTab(item.category);
                                    setSelectedSubMenu(""); // Reset sub-menu selection
                                }}>
                                    <i className="fa fa-inbox fa-lg" aria-hidden="true"></i> {item.category}
                                    <span className="num">{item.total}</span>
                                </a>
                                {item.sub.map((sub, i) => (
                                    <a key={i} href="#" className="side-menu-item" onClick={() => {
                                        setSelectedSubMenu(sub.subMenuItem);
                                    }}>
                                        {sub.subMenuItem}
                                        <span className="num">{sub.itemNumber}</span>
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Adminstrator