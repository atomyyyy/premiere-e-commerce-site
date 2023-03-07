import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import Brand from '../Brand';
import Container from '../Container';
import Config from '../../config.json';
import ExpandedMenu from '../ExpandedMenu';
import Icon from '../Icons/Icon';
import * as styles from './Header.module.css';

import { isBrowser } from '../../helpers/general';
import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';

const Header = (prop) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const [menu, setMenu] = useState();
  const [activeMenu, setActiveMenu] = useState();

  const { data = {} } = useShoppingCartContext();
  const { cart = [] } = data;
  const cartCount = cart.length;

  const handleHover = (navObject) => {
    if (navObject.category) {
      setShowMenu(true);
      setMenu(navObject.category);
    } else {
      setMenu(undefined);
    }
    setActiveMenu(navObject.menuLabel);
  };

  // disable active menu when show menu is hidden
  useEffect(() => {
    if (showMenu === false) setActiveMenu(false);
  }, [showMenu]);

  // hide menu onscroll
  useEffect(() => {
    const onScroll = () => {
      setShowMenu(false);
      setActiveMenu(undefined);
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.root}>
      <Container size={'large'} spacing={'min'}>
        {/* header container */}
        <div className={styles.header}>
          <div className={styles.linkContainer}>
            <nav
              role={'presentation'}
              onMouseLeave={() => {
                setShowMenu(false);
              }}
            >
              {Config.headerLinks.map((navObject) => (
                <Link
                  key={navObject.menuLink}
                  onMouseEnter={() => handleHover(navObject)}
                  className={`${styles.navLink} ${
                    activeMenu === navObject.menuLabel ? styles.activeLink : ''
                  }`}
                  to={navObject.menuLink}
                >
                  {navObject.menuLabel}
                </Link>
              ))}
            </nav>
          </div>
          <div
            role={'presentation'}
            onClick={() => navigate('/')}
            className={styles.burgerIcon}
          >
            { isBrowser() && window.location.pathname !== '/' && <Icon symbol={'caret'} style={{ transform: 'rotate(90deg)'}}></Icon>}
          </div>
          <Brand />
          <div className={styles.actionContainers}>
            <button
              aria-label="Cart"
              className={`${styles.iconButton} ${styles.iconContainer} ${styles.bagIconContainer}`}
              onClick={() => {
                setMobileMenu(false);
                navigate('/cart');
              }}
            >
              <Icon symbol={'bag'}></Icon>
              {cartCount > 0 &&  (
                <div className={styles.bagNotification}>
                  <span>{cartCount}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* menu container */}
      <div
        role={'presentation'}
        onMouseLeave={() => setShowMenu(false)}
        onMouseEnter={() => setShowMenu(true)}
        className={`${styles.menuContainer} ${
          showMenu === true ? styles.show : ''
        }`}
      >
        <Container size={'large'} spacing={'min'}>
          <ExpandedMenu menu={menu} />
        </Container>
      </div>
    </div>
  );
};

export default Header;
