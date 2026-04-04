import { render } from "../config/viewEngine";

export const home = async (c) => { // Ganti (req, res) jadi (c)
  try {
    const html = await render(
      "home", // Nama file EJS kamu (home.ejs)
      {
        title: "Dashboard MVC",
        message: "Hello dari Node + Tailwind 🚀",
      },
      c.req.raw // Di Hono, req diambil dari c.req
    );

    // Kirim hasilnya ke browser pakai c.html
    return c.html(html);

  } catch (error) {
    console.error("Home Controller Error:", error);
    // Kirim error pakai c.text dan status code di parameter kedua
    return c.text("Terjadi kesalahan pada halaman Home", 500);
  }
};