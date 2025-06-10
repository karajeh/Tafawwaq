import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const useUserStore = create((set) => ({
    loading: true,     // Loading state

    // Fetch and set the current user from the token
    getCurrentUser: () => {
        const token = Cookies.get("token");

        if (!token) {
            set({ loading: false });
            return null;
        }

        try {
            const decoded = jwtDecode(token);

            // Check token expiration (optional)
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                set({ loading: false });
                return null;
            }

            // Set the user state if valid
            set({ loading: false });
            return { userId: decoded.userId, sessionToken: token, role: decoded.role }
        } catch (error) {
            console.error("Invalid token", error);
            set({ loading: false });
            return null
        }
    },

}));

export default useUserStore;
