import { render } from "../config/viewEngine";

export const home = async (c) => {
  const html = await render("home", {
    title: "Dashboard Bun MVC",
    message: "Hello dari Bun + Tailwind 🚀",
  });

  return c.html(html);
};