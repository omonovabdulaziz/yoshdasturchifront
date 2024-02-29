import React, { useEffect, useState } from "react";
import styles from "./ProfileEdit.module.scss";
import Image from "next/image";
import api from "@/utils/api";
import { useRouter } from "next/router";

const ProfileEdit = () => {
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [validation, setValidation] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordNotSame, setPasswordNotSame] = useState(false);
  const [otherErrors, setOtherErrors] = useState({});
  const [formData, setFormData] = useState({
    region: "",
    surname: "",
    name: "",
    age: "",
    phoneNumber: "",
    password: "",
  });

  const updateToken = (token) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const handlePasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.status == 200) {
          const userData = res.data;
          setUserInfo(userData);
          setFormData({
            region: userData.region,
            surname: userData.surname,
            name: userData.name,
            age: userData.age,
            phoneNumber: userData.phoneNumber,
            password: "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Phone number validation
    const phonePattern = /^\+998\d{9}$/;
    const isValidPhone = phonePattern.test(formData.phoneNumber);
    setPhoneError(!isValidPhone);

    const isPasswordValid =
      formData.password?.length >= 8 &&
      /\d/.test(formData.password) &&
      /[A-Z]/.test(formData.password);
    setPasswordValidation(!isPasswordValid);
    setValidation(false);
    console.log(formData);
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
        const response = await api.put("/user/updateInformation", formData);
        if (response.status === 200) {
          const newToken = response.data.obj;
          updateToken(newToken);
          router.push("/");
        }
      } catch (error) {
        console.error("Error ProfileEditing:", error);
        if (error.response.status == 409) {
          setValidation(true);
        } else {
          setValidation(false);
        }
      }
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };
  return (
    <div className={styles.ProfileEditAll}>
      <div className={styles.ProfileEditForm}>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          method="POST"
          className={styles.ProfileEditFormInputs}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.ProfileEditFormInput}>
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

            <div className={styles.ProfileEditFormInput}>
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
            <div className={styles.ProfileEditFormInput}>
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
            <div className={styles.ProfileEditFormInput}>
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
            <div className={styles.ProfileEditFormInput}>
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
            <div className={styles.ProfileEditFormInput}>
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
                    autoComplete="password"
                  />
                ) : (
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Parol kiriting"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="password"
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
            <div className={styles.ProfileEditFormInput}>
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
                  />
                ) : (
                  <input
                    type={showPasswordRepeat ? "text" : "password"}
                    name="passwordRepeat"
                    value={repeatPassword}
                    onChange={handlePasswordChange}
                    placeholder="Parol takrorlang"
                    autoComplete="new-password"
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
          <button name="submit">Saqlash</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
