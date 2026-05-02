import { defineConfig } from "vite";

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/Frontend-Mentor-Rock-Paper-Scissors/"
      : "/",
  // server: {
  //   host: true,
  //   port: 5173,
  // },
});
