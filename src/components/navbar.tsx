import React from 'react';

import AccountDetails from './account-details';
import Logo from './logo';

function NavBar() {
  return (
    <div className="flex items-center justify-between p-5 text-white text-lg font-bold">
      <Logo />

      <div className="flex items-center gap-4">
        <span className="ml-3 text-white font-medium text-base text-opacity-90 hover:text-opacity-100">Explore Marketplace</span>

        <AccountDetails />
      </div>
    </div>
  );
}

export default NavBar;
