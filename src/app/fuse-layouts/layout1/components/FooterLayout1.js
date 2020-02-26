import React from 'react';
import {AppBar, Toolbar,} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import PoweredByLinks from 'app/fuse-layouts/shared-components/PoweredByLinks';
import {useSelector} from 'react-redux';

function FooterLayout1(props)
{
    const footerTheme = useSelector(({fuse}) => fuse.settings.footerTheme);

    return (
        null
    );
}

export default FooterLayout1;
