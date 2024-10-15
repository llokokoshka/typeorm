import * as yup from "yup";

const userSchema = yup.object({
  body: yup.object({
    fullName: yup.string()
      .required('Введите ваше имя!'),
    email: yup.string().required('Введите email!').email(),
    password: yup.string()
      .required('Введите пароль!')
      .min(6, 'Минимальная длина пароля - 6 символов!'),
    Dob: yup.date()
      .required('Введите дату рождения!')
      .typeError("Неверный формат даты!")
  }),
});

export default userSchema;