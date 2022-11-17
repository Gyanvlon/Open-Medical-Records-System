import React, { memo } from 'react';
import Dialog from '@material-ui/core/Dialog';

import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogContent } from '@material-ui/core';

 function Loading(props) {
  const [loading, setLoading] = React.useState(props.loader);

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <div>
      <Dialog
        open={loading}
        onClose={handleClose}
      >
      <DialogContent>
      <CircularProgress />
      </DialogContent>
       
      </Dialog>
    </div>
  );
}

export default memo(Loading);