import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

export default function DropDown({ children, menuItems }) {
  const [open, setOpen] = useState(false);
  const [subTitles, setSubTitles] = useState([]);
  const [subTitleAdded, setSubTitleAdded] = useState(0);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    event.preventDefault();

    setOpen(false);
    setSubTitles([]);
    setSubTitleAdded(0);
  }

  function nestedChildrenHoverHandler(subTitle) {
    return subTitle.map(item => (
      <MenuItem
        onFocus={() => null}
        onMouseOver={
          item.children
            ? () => {
              if (subTitleAdded <= 1) {
                setSubTitles([...subTitles, item.children]);
                setSubTitleAdded(2);
              }
            }
            : null
        }
        onMouseLeave={
          item.children
            ? () => {
              setTimeout(() => {
                const newSubTitles = subTitles.pop();
                setSubTitleAdded(newSubTitles);
              }, 500);
              setSubTitleAdded(0);
            }
            : null
        }
        className="DropDown-MenuItems"
        key={uuid()}
      >
        {item.actionTitle}
        <span>{item.children ? ' ▶' : null}</span>
      </MenuItem>
    ));
  }
  return (
    <div className="DropDown">
      <div>
        <Button onClick={handleToggle}>{children}</Button>
        <Popper open={open} keepMounted transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {menuItems.map(item => (
                      <MenuItem
                        onFocus={() => null}
                        onMouseOver={
                          item.children
                            ? () => {
                              if (subTitleAdded <= 0) {
                                setSubTitles([...subTitles, item.children]);
                                setSubTitleAdded(1);
                              }
                            }
                            : () => console.log('not delete')
                        }
                        onMouseLeave={
                          item.children
                            ? () => {
                              setTimeout(() => {
                                const newSubTitles = subTitles.pop();
                                setSubTitleAdded(newSubTitles);
                              }, 500);
                              setSubTitleAdded(0);
                            }
                            : null
                        }
                        className="DropDown-MenuItems"
                        key={uuid()}
                      >
                        {item.actionTitle}
                        <span>{item.children ? ' ▶' : null}</span>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {subTitles.map((subTitle, i) => (
          <ClickAwayListener key={uuid()} onClickAway={handleClose}>
            <MenuList
              style={{
                position: 'absolute',
                top: (i + 1) * 150,
                left: (i + 1) * 150,
                boxShadow: '2px 2px 2px lightGrey',
                borderRadius: 4,
              }}
            >
              {nestedChildrenHoverHandler(subTitle, i)}
            </MenuList>
          </ClickAwayListener>
        ))}
      </div>
    </div>
  );
}

DropDown.propTypes = {
  children: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};
