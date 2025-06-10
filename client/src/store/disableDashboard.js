import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useDisableDashboard = create(
  persist(
    (set) => ({
      isDisabled: true,
      signupRole: "",

      disableDashboard: () => {
        set({ isDisabled: true });
      },
      enableDashboard: () => {
        set({ isDisabled: false });
      },
      studentSignUp: () => {
        set({ signupRole: "student" });
      },
      teacherSignUp: () => {
        set({ signupRole: "teacher" });
      },
    }),
    {
      name: "dashboardStorage",
      getStorage: () => localStorage,
    }
  )
);
