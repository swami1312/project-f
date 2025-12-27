import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const Popup = ({
  open,
  title,
  content,
  primaryText = 'OK',
  secondaryText = 'Cancel',
  onPrimary,
  onSecondary,
  maxWidth = 'sm',
  fullWidth = true,
  disableBackdropClick = false,
}) => {
  const handleClose = (_, reason) => {
    if (disableBackdropClick && reason === 'backdropClick') return;
    onSecondary?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent dividers>
        {typeof content === 'string' ? (
          <Typography variant="body2">{content}</Typography>
        ) : (
          content
        )}
      </DialogContent>

      <DialogActions>
        {secondaryText && (
          <Button onClick={onSecondary}>{secondaryText}</Button>
        )}
        <Button variant="contained" onClick={onPrimary} autoFocus>
          {primaryText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
