import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

const ThreeDotMenu = ({
  items = [], // array of menu items
  onSelect = () => {}, // callback to parent
  icon = '⁝', // default icon
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClick = (item) => {
    onSelect(item); // pass selected item back
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        style={{
          height: '30px',
          width: '30px',
        }}
        disabled={disabled}
      >
        <span className="text-[var(--icon-color2)]">{icon}</span>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item, index) => (
          <div key={index}>
            <MenuItem
              disabled={item.disabled}
              onClick={() => handleClick(item)} // return clicked item
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </MenuItem>

            {item.divider && <Divider />}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default ThreeDotMenu;
