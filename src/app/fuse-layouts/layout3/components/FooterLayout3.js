import React from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import PurchaseButton from 'app/fuse-layouts/shared-components/PurchaseButton';
import PoweredByLinks from 'app/fuse-layouts/shared-components/PoweredByLinks';
import {useSelector} from 'react-redux';

function FooterLayout3(props)
{
    const footerTheme = useSelector(({fuse}) => fuse.settings.footerTheme);

    return (
       null
    );
}

export default FooterLayout3;
