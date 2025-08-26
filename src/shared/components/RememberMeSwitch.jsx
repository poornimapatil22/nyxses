import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#4B18A1',
        opacity: 1,
        border: 0,
        ...theme.applyStyles?.('dark', { backgroundColor: 'background: rgba(0, 0, 0, 0.38);' }),
      },
      '&.Mui-disabled + .MuiSwitch-track': { opacity: 0.5 },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#4B18A1',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles?.('dark', { color: theme.palette.grey[600] }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles?.('dark', { opacity: 0.3 }),
    },
  },
  '& .MuiSwitch-thumb': { boxSizing: 'border-box', width: 22, height: 22 },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], { duration: 500 }),
    ...theme.applyStyles?.('dark', { backgroundColor: '#39393D' }),
  },
}));

export default function RememberMeSwitch({
  checked,
  onChange,
  name = 'remember',
  label = 'Remember me',
  ...props
}) {
  return (
    <FormControlLabel
      control={<IOSSwitch name={name} checked={checked} onChange={onChange} {...props} />}
      label={label}
        sx={{ color: 'text.primary', gap: 1}}
    />
  );
}
