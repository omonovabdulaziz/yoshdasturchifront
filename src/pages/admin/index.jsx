import api from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Admin = () => {
  const router = useRouter();

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
    <div style={{ display: "flex", gap: "50px" }}>
      <Link
        href="/admin/activeUsers"
        onClick={() => (window.location.href = "/admin/activeUsers")}>
        Active userlar
      </Link>
      <Link href="/admin/inactiveUsers">Active emas userlar</Link>
    </div>
  );
};

export default Admin;
