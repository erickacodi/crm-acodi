import {MaterialUIComponentsNavigation} from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
import {authRoles} from 'app/auth';

const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'      : 'clientes',
                'title'   : 'Clientes',
                'type'    : 'collapse',
                'icon'    : 'dashboard',
                'children': [
                    {
                        'id'   : 'client-search',
                        'title': 'Buscar cliente',
                        'type' : 'item',
                        'url'  : '/apps/client'
                    },
                    {
                        'id'   : 'client-new',
                        'title': 'Nuevo cliente',
                        'type' : 'item',
                        'url'  : '/apps/clients/new'
                    },
                    {
                        'id'   : 'e-commerce-products',
                        'title': 'Products',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-product-detail',
                        'title': 'Product Detail',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-new-product',
                        'title': 'New Product',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products/new',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-orders',
                        'title': 'Orders',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/orders',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-order-detail',
                        'title': 'Order Detail',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/orders/1',
                        'exact': true
                    }

                ]
            },
            {
                'id'      : 'dashboards',
                'title'   : 'Estadisticas',
                'type'    : 'item',
                'icon'    : 'dashboard',
                'url'     : '/apps/dashboards/analytics'
            },
            {
                'id'   : 'calendar',
                'title': 'Calendario',
                'type' : 'item',
                'icon' : 'today',
                'url'  : '/apps/calendar'
            },
        {
            'id'   : 'academy',
            'title': 'Academy',
            'type' : 'item',
            'icon' : 'school',
            'url'  : '/apps/academy'
        },
        {
            'id'   : 'mail',
            'title': 'Mail',
            'type' : 'item',
            'icon' : 'email',
            'url'  : '/apps/mail',
            'badge': {
                'title': 25,
                'bg'   : '#F44336',
                'fg'   : '#FFFFFF'
            }
        },
        {
            'id'   : 'todo',
            'title': 'To-Do',
            'type' : 'item',
            'icon' : 'check_box',
            'url'  : '/apps/todo',
            'badge': {
                'title': 3,
                'bg'   : 'rgb(255, 111, 0)',
                'fg'   : '#FFFFFF'
            }
        },
        {
            'id'   : 'file-manager',
            'title': 'File Manager',
            'type' : 'item',
            'icon' : 'folder',
            'url'  : '/apps/file-manager'
        },
        {
            'id'   : 'contacts',
            'title': 'Contacts',
            'type' : 'item',
            'icon' : 'account_box',
            'url'  : '/apps/contacts/all'
        },
        {
            'id'   : 'chat',
            'title': 'Chat',
            'type' : 'item',
            'icon' : 'chat',
            'url'  : '/apps/chat',
            'badge': {
                'title': 13,
                'bg'   : 'rgb(9, 210, 97)',
                'fg'   : '#FFFFFF'
            }
        },
        {
            'id'   : 'scrumboard',
            'title': 'Scrumboard',
            'type' : 'item',
            'icon' : 'assessment',
            'url'  : '/apps/scrumboard'
        },
        {
            'id'   : 'notes',
            'title': 'Notes',
            'type' : 'item',
            'icon' : 'note',
            'url'  : '/apps/notes'
        }
        ]
    }
];

export default navigationConfig;
