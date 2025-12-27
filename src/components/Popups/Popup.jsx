import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
const spinner = (
  <span
    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
    style={{
      borderTopColor: 'transparent',
    }}
  ></span>
);

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
  isLoading,
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
        <Button
          variant="contained"
          onClick={onPrimary}
          autoFocus
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              {spinner}
              <span>Processing...</span>
            </>
          ) : (
            primaryText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
