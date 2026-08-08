import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Ad daxil edilməlidir")
    .isLength({ min: 2 })
    .withMessage("Ad ən azı 2 simvol olmalıdır"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email daxil edilməlidir")
    .isEmail()
    .withMessage("Düzgün email formatı deyil")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Şifrə daxil edilməlidir")
    .isLength({ min: 6 })
    .withMessage("Şifrə ən azı 6 simvol olmalıdır"),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email daxil edilməlidir")
    .isEmail()
    .withMessage("Düzgün email formatı deyil"),

  body("password").notEmpty().withMessage("Şifrə daxil edilməlidir"),
];
export const movieValidation = [
  body("title").trim().notEmpty().withMessage("Film adı daxil edilməlidir"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Təsvir daxil edilməlidir")
    .isLength({ min: 10 })
    .withMessage("Təsvir ən azı 10 simvol olmalıdır"),

  body("poster")
    .trim()
    .notEmpty()
    .withMessage("Poster şəkli lazımdır")
    .isURL()
    .withMessage("Poster düzgün URL olmalıdır"),

  body("year")
    .notEmpty()
    .withMessage("İl daxil edilməlidir")
    .isInt({ min: 1888, max: new Date().getFullYear() + 1 })
    .withMessage("Düzgün il daxil edin"),

  body("director").trim().notEmpty().withMessage("Rejissor adı daxil edilməlidir"),

  body("genre").optional().isArray().withMessage("Janr array formatında olmalıdır"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Reytinq 0-10 arası olmalıdır"),
];