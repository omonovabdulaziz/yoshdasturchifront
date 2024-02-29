import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./admin.module.scss"; // Import your module.scss file
import Link from "next/link";
import api from "@/utils/api";
import { useRouter } from "next/router";

const FalseUsers = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const router = useRouter();

  const getCookie = (key) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${key}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  useEffect(() => {
    const token = getCookie("token");
    setToken(token);
    const getUsers = async () => {
      try {
        const res = await axios.get(
          "https://api.yoshdasturchi.uz/api/v1/user/getUserByStatus?status=false&page=0&size=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (typeof window !== "undefined") {
          sessionStorage.setItem("users", JSON.stringify(res.data.content));
        }
        setUsers(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(
        `https://api.yoshdasturchi.uz/api/v1/user/updateConfirm/${id}?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the local state to reflect the status change
      setUsers(
        users.map((user) => {
          if (user.id === id) {
            return { ...user, status: !user.status };
          }
          return user;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await api.get("/user/getSelfInformation");
        if (res.data.systemRoleName !== "ROLE_ADMIN") {
          router.push("/");
        }
      } catch (err) {
        console.error(err);
        if (err.response.status === 409) {
          router.push("/");
        }
      }
    };
    getUserInfo();
  }, [router]);

  return (
    <div className={styles["users-container"]}>
      <Link href="/admin">back</Link>
      <table className={styles["users-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Region</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.region}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.status}
                  onChange={() => handleStatusChange(user.id, !user.status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FalseUsers;
