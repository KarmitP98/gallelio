import React from 'react';
import './Notification.css';

interface NotificationProps {
	message: string,
	show: boolean
}

const Notification = ({message, show}: NotificationProps) => {
	
	return (
	  <>
			  <div className={`notification ${show ? 'show': ''}`}>
				<p>{message}</p>
			  </div>
	  </>
	);
};

export default Notification;
