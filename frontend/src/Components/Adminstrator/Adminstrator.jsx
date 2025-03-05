import React, { useState } from 'react'
import './Adminstrator.scss'

const Adminstrator = () => {
    const [selectedTab, setSelectedTab] = useState("")
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
            category: "Inquires",
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


    return (
        <div>
            <div id="Adminstrator-main-container">


                <div id="left-column">
                    <p class="column-heading">Browse</p>
                    <div class="vertical-menu">
                        {browseMenu.map((item, idx) => {
                            return (
                                <div key={idx}>
                                    <a href="#" class="highlight">
                                        <i class="fa fa-inbox fa-lg" aria-hidden="true"></i> {item.category}
                                        <span class="num">{item.total}</span>
                                    </a>
                                    {item.sub.map((sub, i) => {
                                        return (
                                            <a href="#" class="side-menu-item">{sub.subMenuItem}
                                                <span class="num">{sub.itemNumber}</span>
                                            </a>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div id="content-area">
                    <div class="message-row">
                        <img width="40px" height="40px" src="http://www.danielbrayphotography.com/img/s2/v70/p311082303-4.jpg" />
                        <span class="sender-name">Lela	Williamson (2)</span> <span class="label grey-label label-right">Important</span>
                        <br />
                        <span class="message">Etiam quis lorem a nisi interdum tincidunt. <strong>In hendrerit felis</strong> a est ornare malesuada. Pellentesque efficitur semper lacus.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminstrator