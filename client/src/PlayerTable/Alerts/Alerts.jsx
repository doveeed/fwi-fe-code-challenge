import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAlerts } from '../../appState/selectors';
import { hideAlert } from '../../appState/actions';
import './Alerts.scss';

const Alerts = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(getAlerts);

  const handleClose = (id) => {
    dispatch(hideAlert(id));
  };

  return (
    <>
      {Object.entries(alerts).map(([key, alert]) => (
        <Snackbar
          className={`alert__${alert.type}`}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={4000}
          onClose={() => handleClose(alert.id)}
          open={true}
          message={alert.message}
          key={key}
          data-testid={`alerts_${key}`}
        />
      ))}
    </>
  );
};

export default Alerts;
