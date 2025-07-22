// app/(section)/layout.tsx
import React from "react";
import type { Metadata } from "next";
import "../../styles/globals.scss";
import Sidebar from "@/components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Dashboard - Lendsqr",
  description: "Loan Management System Dashboard",
};

interface Props {
  children: React.ReactNode;
}

export default function DashLayout({ children }: Props) {
  return (
    <section>
      <Sidebar>{children}</Sidebar>
    </section>
  );
}
