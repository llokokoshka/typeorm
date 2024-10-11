const yup = require("yup");

const userSchema = yup.object({
  fullName: yup.string().required('Print your name'),
  email: yup.string()
    .email(),
  password: yup.string()
    .required()
    .min(6),
  Dob: yup.date().required('Pront date of birth'),
});

export default userSchema;