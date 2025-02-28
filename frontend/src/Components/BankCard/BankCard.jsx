import React from "react";
import "./BankCard.scss";

export default function BankCard() {
    return (
        <div className="bank-card">
            <div class="cc">

                <h2>Process Transaction</h2>

                <span class="provider mastercard">MasterCard</span>

                <span class="provider visa">Visa</span>

                <div class="number">
                    <input type="text" maxlength="4" placeholder="5280" />
                    <input type="text" maxlength="4" />
                    <input type="text" maxlength="4" />
                    <input type="text" maxlength="4" />
                    <span class="instructions">5280</span>
                </div>

                <div class="date">
                    <span class="instructions valid">Valid Thru</span>
                    <input type="text" maxlength="5" placeholder="00/00" />

                    <span class="instructions valid">CCV</span>
                    <input type="text" maxlength="3" placeholder="123" />
                </div>

                <div class="name">
                    <input class="full-name" type="text" maxlength="" inputmode='numeric' placeholder="John Doe" />
                    <span class="instructions">Name on Card</span>
                </div>

                <div class="shine"></div>
                <div class="shine shine-layer-two"></div>
            </div>
        </div>
    );
}
