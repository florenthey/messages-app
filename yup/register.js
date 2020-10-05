import * as Yup from "yup";

export default Yup.object().shape({
  username: Yup.string()
    .min(3, "Votre nom d'utilisateur doit contenir un minimum de 3 lettres")
    .max(25, "Votre nom d'utilisateur peux contenir au plus 25 lettres")
    .required("Un nom d'utilisateur est requis"),
});
