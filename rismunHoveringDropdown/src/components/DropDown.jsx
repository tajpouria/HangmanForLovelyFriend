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

const TOP_INVENTOR = [55, 102, 150, 200, 250, 290, 390, 390, 390, 410, 460];

export default function DropDown({ children, menuItems }) {
  const [open, setOpen] = useState(false);
  const [subTitles, setSubTitles] = useState([]);
  const [subTitleAdded, setSubTitleAdded] = useState(0);
  const [subTitleNestedAdded, setSubTitleNestedAdded] = useState(1);
  const [topNestedSubTitles, setTopNestedSubTitles] = useState(0);
  const [topDoubleNestedSubTitles, setTopDoubleNestedSubTitles] = useState(0);
  const [onHoverItem, setOnHoverItem] = useState([]);
  const anchorRef = useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    event.preventDefault();

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    setSubTitles([]);
    setSubTitleAdded(0);
    setSubTitleNestedAdded(1);
    setOnHoverItem([]);
  }

  function nestedChildrenHoverHandler(subTitle, nested) {
    if (!subTitle.length) subTitle = [subTitle];
    return subTitle.map((item, i) => (
      <MenuItem
        className="DropDown-MenuItems"
        style={{
          backgroundColor: onHoverItem.indexOf(item.actionTitle) !== -1 ? 'lightGrey' : 'white',
        }}
        onFocus={() => null}
        onMouseOver={
          item.children
            ? () => {
              if (subTitleAdded <= 1 && subTitleNestedAdded < 2) {
                if (subTitles.length < 2) setSubTitles([...subTitles, item.children]);
                setSubTitleAdded(2);
                setSubTitleNestedAdded(2);
                setTopDoubleNestedSubTitles(topNestedSubTitles + i);
                setOnHoverItem([...new Set([...onHoverItem, item.actionTitle])]);
              }
            }
            : () => {
              if (subTitleAdded <= 1 || nested === 1) {
                if (subTitleNestedAdded < 2) {
                  setOnHoverItem([...new Set([...onHoverItem, item.actionTitle])]);
                  setSubTitleAdded(2);
                  setSubTitleNestedAdded(2);
                }
              }
            }
        }
        onMouseLeave={
          item.children
            ? () => {
              const newSubTitles = subTitles.pop();
              if (subTitleNestedAdded === 1) setSubTitles(newSubTitles);
              setSubTitleAdded(1);
              setSubTitleNestedAdded(1);
              const newOnHoverItems = onHoverItem.filter(it => it !== item.actionTitle);
              setOnHoverItem(newOnHoverItems);
            }
            : () => {
              setSubTitleAdded(1);
              setSubTitleNestedAdded(1);
              const newOnHoverItems = onHoverItem.filter(it => it !== item.actionTitle);
              setOnHoverItem(newOnHoverItems);
            }
        }
        key={uuid()}
        onClick={handleClose}
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
                      className="DropDown-MenuItems"
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
                          : () => {
                            if (subTitleAdded <= 0) {
                              setSubTitleAdded(1);
                              setOnHoverItem([...new Set([...onHoverItem, item.actionTitle])]);
                            }
                          }
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
                          : () => {
                            setSubTitleAdded(0);
                            const newOnHoverItems = onHoverItem.filter(
                              it => it !== item.actionTitle,
                            );
                            setOnHoverItem(newOnHoverItems);
                          }
                      }
                      key={uuid()}
                      onClick={handleClose}
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
              left: (i + 1) * 150,
              top:
                i === 0 ? TOP_INVENTOR[topNestedSubTitles] : TOP_INVENTOR[topDoubleNestedSubTitles],
              boxShadow: '2px 2px 2px lightGrey',
              borderRadius: 4,
              marginLeft: i !== 2 && -40,
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
