import React, { useEffect, useState } from 'react';
import './OrderTracking.scss';
import UserOrder from '../UserOrder/UserOrder';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const OrderTracking = ({ trackingNumber, orderStatus = "Preparing" }) => {
  const [orderData, setOrderData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user order data from localStorage
    const storedOrder = localStorage.getItem('userOrdering');
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    } else {
      // If no order data is found, navigate to the PlaceAnOrder page
      // navigate('/menu');
    }
  }, [navigate]);
  return (
    <div className="order-tracking">
      <Navbar />
      {orderData && <UserOrder />}
      {!orderData &&

        <><h3 className="tracking-title">Order Tracking</h3>
          <p><strong>Tracking Number:</strong>
          </p>
          <input className='form-control' type="text" />
          <p><strong>Status:</strong> {orderStatus}</p>
          <div className="tracking-status">
            <div className={`status-circle ${orderStatus === 'Shipped' ? 'shipped' : 'pending'}`}></div>
            <span>{orderStatus === 'Shipped' ? 'On the way!' : 'Processing Order'}</span>
          </div>
        </>
      }
    </div>
  );
};

export default OrderTracking;
