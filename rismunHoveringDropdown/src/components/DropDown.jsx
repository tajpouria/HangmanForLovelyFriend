/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, {
  useState, useRef, useContext, useEffect,
} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

import { DropDownJoinContext } from './DropDownContainer';

const TOP_INVENTOR = [30, 90, 150, 210, 270, 325, 390, 390, 390, 410, 460];

export default function DropDown({ children, menuItems }) {
  const [open, setOpen] = useState(false);
  const [subTitles, setSubTitles] = useState([]);
  const [subTitleAdded, setSubTitleAdded] = useState(0);
  const [subTitleNestedAdded, setSubTitleNestedAdded] = useState(1);
  const [topNestedSubTitles, setTopNestedSubTitles] = useState(0);
  const [topDoubleNestedSubTitles, setTopDoubleNestedSubTitles] = useState(0);
  const [onHoverItem, setOnHoverItem] = useState([]);
  const anchorRef = useRef(null);

  const { setSelectedDropDownMenu, activatedDropDown } = useContext(DropDownJoinContext);

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    setSubTitles([]);
    setSubTitleAdded(0);
    setSubTitleNestedAdded(1);
    setOnHoverItem([]);
  }

  useEffect(() => {
    if (activatedDropDown !== children.toString()) return handleClose();
  }, [activatedDropDown]);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
    setSelectedDropDownMenu(children.toString());
  }

  function nestedChildrenHoverHandler(subTitle, nested) {
    if (!subTitle.length) subTitle = [subTitle];
    return subTitle.map((item, i) => (
      <li
        className="DropDown-MenuItems"
        style={{
          backgroundColor: onHoverItem.indexOf(item.actionTitle) !== -1 ? 'lightGrey' : 'white',
        }}
        onFocus={() => null}
        onMouseOver={
          item.children
            ? () => {
              if (subTitleAdded <= 1) {
                if (subTitles.length < 2) setSubTitles([...subTitles, item.children]);
                setSubTitleAdded(2);
                setTopDoubleNestedSubTitles(topNestedSubTitles + i);
                setOnHoverItem([...new Set([...onHoverItem, item.actionTitle])]);
              }
            }
            : () => {
              if (subTitleAdded <= 1 || nested === 1 || subTitleNestedAdded <= 1) {
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
              if (subTitleNestedAdded === 1 && nested > 0) setSubTitles(newSubTitles);
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
        <span>{item.actionTitle}</span>
        <span>{item.children ? ' ▶' : ''}</span>
      </li>
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
                  className="DropDown-MenuList"
                  style={{
                    position: 'absolute',
                    borderRadius: 4,
                    marginTop: -25,
                    marginLeft: -25,
                    padding: 20,
                  }}
                >
                  {menuItems.map((item, i) => (
                    <li
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
                    </li>
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
            className="DropDown-MenuList"
            style={{
              position: 'absolute',
              left: (i + 1) * 90,
              top:
                i === 0 ? TOP_INVENTOR[topNestedSubTitles] : TOP_INVENTOR[topDoubleNestedSubTitles],
              borderRadius: 4,
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
