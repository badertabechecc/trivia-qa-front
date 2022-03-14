import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, useField } from 'formik';

interface IPops {
  label: string;
  name: string;
  placeholder: string;
  type: string;
}
const FormElement = ({ label, ...props }: IPops) => {
  const [field, meta] = useField(props);
  const isInvalid: boolean = Boolean(meta.error) && meta.touched;
  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Field as={Input} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormElement;
