import ListItem from '@mui/material/ListItem';
import React from 'react';
import { useRenderLink } from '../../utils/routes';

export default function ListItemLink(props: ListItemLinkProps) {
    const { to, children } = props;
  
    const renderLink = useRenderLink(to);
  
    return (
        <ListItem component={renderLink} {...props}>
            {children}
        </ListItem>
    );
}

interface ListItemLinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}