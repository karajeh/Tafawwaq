import { Jost } from "next/font/google";

// Import Jost font with specific options
export const jost = Jost({
  subsets: ["latin"], // Subset of the font
  weight: ["400", "500", "700"], // Example of using regular (400) and bold (700) weights
  style: ["normal", "italic"], // Optional: include normal and italic styles
});
