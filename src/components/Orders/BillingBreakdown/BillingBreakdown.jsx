import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import "./BillingBreakdown.css";

const BillingBreakdown = ({ billingData }) => {
    console.log("billingData", billingData);
    return (
        <div className="billingBreakdownWrapper">
            <div className="billingBreakdownContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>MRP</td>
                            <td>{billingData?.MRP}</td>
                        </tr>
                        <tr>
                            <td>Discount</td>
                            <td>{billingData?.discount}</td>
                        </tr>
                        <tr>
                            <td>Delivery Fee</td>
                            <td>{billingData?.shipping_charge}</td>
                        </tr>
                        <tr>
                            <td>Surge Fee</td>
                            <td>{billingData?.surge_charge}</td>
                        </tr>
                        <tr>
                            <td>
                                GST{" "}
                                <Tooltip
                                    title="Goods and Services Tax"
                                    TransitionComponent={Zoom}
                                    arrow
                                    placement="right-start"
                                >
                                    {" "}
                                    <InfoIcon />
                                </Tooltip>
                            </td>
                            <td>{billingData?.gst}</td>
                        </tr>
                        <tr>
                            <td>NET</td>
                            <td>{billingData?.net}</td>
                        </tr>
                        <tr>
                            <td>Coupon Fee</td>
                            <td>{billingData?.discount}</td>
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td>{billingData?.total_amount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BillingBreakdown;
