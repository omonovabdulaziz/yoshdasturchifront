import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Register.module.scss";
import Link from "next/link";
import Image from "next/image";
import { RegisterFrame } from "@/assets";
import { useRouter } from "next/router";
import getDeviceIp from "@/utils/getDeviceIp";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const router = useRouter();
  const [validation, setValidation] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordNotSame, setPasswordNotSame] = useState(false);
  const [otherErrors, setOtherErrors] = useState({});
  const [formData, setFormData] = useState({
    region: "",
    name: "",
    surname: "",
    age: "",
    deviceIp: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    getDeviceIp().then((ip) => {
      setFormData((prevData) => ({ ...prevData, deviceIp: ip }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
  };

  const handlePasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

  const setCookie = (key, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
  };

  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Phone number validation
    const phonePattern = /^\+998\d{9}$/;
    const isValidPhone = phonePattern.test(formData.phoneNumber);
    setPhoneError(!isValidPhone);

    const isPasswordValid =
      formData.password.length >= 8 &&
      /\d/.test(formData.password) &&
      /[A-Z]/.test(formData.password);
    setPasswordValidation(!isPasswordValid);
    setValidation(false);

    if (formData.password !== repeatPassword) {
      setPasswordNotSame(true);
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
      setPasswordNotSame(false);
    }

    // Check for other required fields and set errors
    setOtherErrors({
      region: !formData.region,
      name: !formData.name,
      surname: !formData.surname,
      age: !formData.age,
    });

    if (
      !isValidPhone ||
      !isPasswordValid ||
      formData.password !== repeatPassword ||
      Object.values(otherErrors).some(Boolean)
    ) {
      return;
    } else {
      try {
        const response = await axios.post(
          "https://api.yoshdasturchi.uz/api/v1/auth/register",
          formData
        );
        if (response.status === 200) {
          const data = response.data;
          setCookie("token", data.object, 100);
          router.push("/");
        }
      } catch (error) {
        console.error("Error registering:", error);
        if (error.response.status == 409) {
          setValidation(true);
        } else {
          setValidation(false);
        }
      }
    }
  };
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.push("/");
    }
  });

  return (
    <div className={styles.RegisterContainer}>
      <div className={styles.RegisterImage}>
        <Image
          className={styles.RegisterImg}
          src={RegisterFrame}
          alt="Register Frame"
        />
      </div>
      <div className={styles.RegisterForm}>
        <form
          autoComplete="off"
          method="POST"
          className={styles.RegisterFormInputs}
          onSubmit={handleSubmit}>
          {/* <div>
            <h1>Lorem ipsum dolor sit amet</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis,
              non? Iure error eos suscipit magnam.
            </p>
          </div> */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="region">Viloyat</label>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.selectDropdown}
                  name="region"
                  id="region"
                  required
                  value={formData.region}
                  onChange={handleChange}>
                  <option value="" disabled>
                    Viloyatni tanlang
                  </option>
                  <option value="Toshkent">Tashkent Shahri</option>
                  <option value="Qoraqalpogiston">
                    {`Qoraqalpog\'iston Respublikasi`}
                  </option>
                  <option value="Andijon">Andijon</option>
                  <option value="Buxoro">Buxoro</option>
                  <option value="Jizzax">Jizzax</option>
                  <option value="Qashqadaryo">Qashqadaryo</option>
                  <option value="Navoiy">Navoiy</option>
                  <option value="Namangan">Namangan</option>
                  <option value="Samarqand">Samarqand</option>
                  <option value="Surxandaryo">Surxondaryo</option>
                  <option value="Sirdaryo">Sirdaryo</option>
                  <option value="ToshkentRegion">Toshkent Viloyati</option>
                  <option value="Fargona">{`Farg'ona`}</option>
                  <option value="Xorazm">Xorazm</option>
                </select>
              </div>
            </div>

            <div className={styles.RegisterFormInput}>
              <label htmlFor="name">Ism</label>
              <input
                type="text"
                name="name"
                placeholder="Ismingizni kiriting"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="surname">Familya</label>
              <input
                type="text"
                name="surname"
                placeholder="Familyangizni kiriting"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="age">Yoshingiz</label>
              <input
                type="number"
                name="age"
                placeholder="Yoshingizni kiriting"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="phone">Telefon Raqam</label>
              {phoneError || validation ? (
                <div>
                  <input
                    style={{ border: "1px solid red" }}
                    type="text"
                    name="phoneNumber"
                    placeholder="Telefon raqamingizni kiriting"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              ) : (
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Telefon raqamingizni kiriting"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              )}
              {phoneError && (
                <p style={{ color: "red", margin: "0", fontSize: "0.7rem" }}>
                  Telefon raqam formati: +998999999999
                </p>
              )}
              {validation && (
                <p style={{ color: "red", margin: "0", fontSize: "0.7rem" }}>
                  Bunday raqamli foydalanuvchi mavjud!
                </p>
              )}
            </div>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="password">Parol</label>
              <div className={styles.passwordInputContainer}>
                {passwordValidation || passwordNotSame ? (
                  <input
                    style={{ border: "1px solid red" }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Parol kiriting"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                ) : (
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Parol kiriting"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                )}
                <div
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibility}>
                  <i className={`ri-eye-${showPassword ? "off-" : ""}line`}></i>
                </div>
              </div>
              {passwordValidation && (
                <p style={{ color: "red", margin: "0", fontSize: "0.7rem" }}>
                  Parol 8 ta belgidan {`ko\'p`}, 1 ta raqam va 1 ta katta harf
                  kerak.
                </p>
              )}
              {passwordNotSame ? (
                <p style={{ color: "red", margin: "0", fontSize: "0.7rem" }}>
                  Parol bir xil emas!
                </p>
              ) : (
                ""
              )}
            </div>
            <div className={styles.RegisterFormInput}>
              <label htmlFor="passwordRepeat">Parolni takrorlang</label>
              <div className={styles.passwordInputContainer}>
                {passwordValidation || passwordNotSame ? (
                  <input
                    style={{ border: "1px solid red" }}
                    type={showPasswordRepeat ? "text" : "password"}
                    name="passwordRepeat"
                    value={repeatPassword}
                    onChange={handlePasswordChange}
                    placeholder="Parol takrorlang"
                    autoComplete="new-password"
                    required
                  />
                ) : (
                  <input
                    type={showPasswordRepeat ? "text" : "password"}
                    name="passwordRepeat"
                    value={repeatPassword}
                    onChange={handlePasswordChange}
                    placeholder="Parol takrorlang"
                    autoComplete="new-password"
                    required
                  />
                )}
                <div
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibilityRepeat}>
                  <i
                    className={`ri-eye-${
                      showPasswordRepeat ? "off-" : ""
                    }line`}></i>
                </div>
              </div>
              {passwordValidation && (
                <p style={{ color: "red", margin: "0", fontSize: "0.7rem" }}>
                  Parol 8 ta belgidan {`ko\'p`}, 1 ta raqam va 1 ta katta harf
                  kerak.
                </p>
              )}
              {passwordNotSame && (
                <p style={{ color: "red", margin: "0", fontSize: "0.7rem" }}>
                  Parol bir xil emas!
                </p>
              )}
            </div>
          </div>
          <button name="submit">Akkaunt yaratish</button>
          <p className={styles.RegisterSignIn}>
            Akkauntingiz bormi?{" "}
            <Link style={{ textDecoration: "none" }} href="/login">
              <span>Kirish</span>
            </Link>
            <br />
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
