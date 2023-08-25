import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";

const Alert = () => {
  const { error, success } = useSelector((state) => state.alert);
  const [visible, setVisible] = useState(false); 

  useEffect(() => {
    if (error || success) {
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }
  }, [error, success]);

  return (
    <div>
      <h2>
        {alert.loading && <Loading />}
        {visible && error && (
          <Toast title="Error" body={error} bgColor="var(--error-color)" textColor="white"/>
        )}
        {visible && success && (
          <Toast title="Success" body={success} bgColor="var(--success-color)" />
        )}
      </h2>
    </div>
  );
};


export default Alert;
