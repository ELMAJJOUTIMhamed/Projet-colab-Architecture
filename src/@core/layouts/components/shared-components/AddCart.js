import IconButton from '@mui/material/IconButton';
import { CartOutline } from 'mdi-material-ui';
import Link from 'next/link';

const CartIcon = () => {
  return (

    <Link passHref href={'/pages/cart'} >
    <IconButton color='inherit' aria-label='Open shopping cart'>
      < CartOutline />
    </IconButton>
    </Link>
  );
};

export default CartIcon;


