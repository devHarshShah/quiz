import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { Eye, EyeOff } from 'react-feather';
import { InputProps } from '@nextui-org/react';

type PasswordInputProps = InputProps & {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = ({ value, onChange, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-96">
      <Input isRequired type={showPassword ? 'text' : 'password'} value={value} onChange={onChange} {...props} />
      <Button className="absolute right-[-14px] top-0 mt-10" size="sm" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  );
};

export default PasswordInput;
