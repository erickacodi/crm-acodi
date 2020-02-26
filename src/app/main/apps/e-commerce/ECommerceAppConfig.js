import React from 'react';

export const ECommerceAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/client',
            component: React.lazy(() => import('./orders/Orders'))
        },
        {
            path     : '/apps/clients/:clientId/:clientHandle?',
            component: React.lazy(() => import('./new-order/NewOrder'))
        },
        {
            path     : '/apps/clients/interest/:clientId/?',
            component: React.lazy(() => import('./new-order/NewInterest'))
        },
        {
            path     : '/apps/e-commerce/products/:clientId/:productHandle?',
            component: React.lazy(() => import('./product/Product'))
        },
        {
            path     : '/apps/e-commerce/products',
            component: React.lazy(() => import('./products/Products'))
        },
        {
            path     : '/apps/e-commerce/orders/:orderId',
            component: React.lazy(() => import('./order/Order'))
        },
        {
            path     : '/apps/e-commerce/orders',
            component: React.lazy(() => import('./orders/Orders'))
        }
    ]
};
