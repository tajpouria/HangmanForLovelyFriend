import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const TOP_INVENTOR = [55, 102, 150, 200, 250, 275, 310, 300, 370];

export default function DropDown({ children, menuItems }) {
  const [open, setOpen] = useState(false);
  const [subTitles, setSubTitles] = useState([]);
  const [subTitleAdded, setSubTitleAdded] = useState(0);
  const [topNestedSubTitles, setTopNestedSubTitles] = useState(0);
  const [topDoubleNestedSubTitles, setTopDoubleNestedSubTitles] = useState(0);
  const [onHoverItem, setOnHoverItem] = useState([]);
  const anchorRef = useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  console.log(onHoverItem);

  function handleClose(event) {
    event.preventDefault();

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    setSubTitles([]);
    setSubTitleAdded(0);
  }

  function nestedChildrenHoverHandler(subTitle) {
    return subTitle.map((item, i) => (
      <MenuItem
        style={{
          backgroundColor: onHoverItem.indexOf(item.actionTitle) !== -1 ? 'lightGrey' : 'white',
        }}
        onFocus={() => null}
        onMouseOver={
          item.children
            ? () => {
              if (subTitleAdded <= 1) {
                setSubTitles([...subTitles, item.children]);
                setSubTitleAdded(2);
                setTopDoubleNestedSubTitles(topNestedSubTitles + i);
                setOnHoverItem([...new Set([...onHoverItem, item.actionTitle])]);
              }
            }
            : () => null
        }
        onMouseLeave={
          item.children
            ? () => {
              const newSubTitles = subTitles.pop();
              setSubTitleAdded(newSubTitles);
              setSubTitleAdded(1);
              const newOnHoverItems = onHoverItem.filter(it => it !== item.actionTitle);
              setOnHoverItem(newOnHoverItems);
            }
            : () => null
        }
        className="DropDown-MenuItems"
        key={uuid()}
      >
        {item.actionTitle}
        <span>{item.children ? ' ▶' : ''}</span>
      </MenuItem>
    ));
  }

  return (
    <div className="DropDown">
      <Button onClick={handleToggle}>{children}</Button>
      <Popper anchorEl={anchorRef.current} open={open} keepMounted transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  style={{
                    position: 'absolute',
                    borderRadius: 4,
                    marginLeft: -30,
                    padding: 30,
                  }}
                >
                  {menuItems.map((item, i) => (
                    <MenuItem
                      style={{
                        backgroundColor:
                          onHoverItem.indexOf(item.actionTitle) !== -1 ? 'lightGrey' : 'white',
                      }}
                      onFocus={() => null}
                      onMouseOver={
                        item.children
                          ? () => {
                            if (subTitleAdded <= 0) {
                              setSubTitles([...subTitles, item.children]);
                              setSubTitleAdded(1);
                              setTopNestedSubTitles(i);
                              setOnHoverItem([...new Set([...onHoverItem, item.actionTitle])]);
                            }
                          }
                          : () => {}
                      }
                      onMouseLeave={
                        item.children
                          ? () => {
                            const newSubTitles = subTitles.pop();
                            setSubTitleAdded(newSubTitles);
                            setSubTitleAdded(0);
                            const newOnHoverItems = onHoverItem.filter(
                              it => it !== item.actionTitle,
                            );
                            setOnHoverItem(newOnHoverItems);
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
              left: (i + 1) * 150,
              top:
                i === 0 ? TOP_INVENTOR[topNestedSubTitles] : TOP_INVENTOR[topDoubleNestedSubTitles],
              boxShadow: '2px 2px 2px lightGrey',
              borderRadius: 4,
              marginLeft: -40,
              padding: i === 0 ? 20 : 30,
            }}
          >
            {nestedChildrenHoverHandler(subTitle, i)}
          </MenuList>
        </ClickAwayListener>
      ))}
    </div>
  );
}

DropDown.propTypes = {
  children: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};
