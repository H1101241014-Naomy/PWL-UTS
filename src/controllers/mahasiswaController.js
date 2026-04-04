import * as mahasiswaModel from "../models/mahasiswaModel.js";
import { render } from "../config/viewEngine";

/**
 * 1. Menampilkan Daftar Mahasiswa
 * Mengambil data dari Model dan merender ke views/mahasiswa/index.ejs
 */
export const index = async (c) => {
    try {
        const data = await mahasiswaModel.getAll();
        const html = await render("mahasiswa/index", { 
            mahasiswa: data, 
            title: "Daftar Mahasiswa" 
        }, c.req.raw);
        
        return c.html(html);
    } catch (error) {
        console.error("Error Index:", error);
        return c.text("Gagal memuat data mahasiswa", 500);
    }
};

/**
 * 2. Menampilkan Form Tambah Mahasiswa
 * Merender file views/mahasiswa/create.ejs
 */
export const createForm = async (c) => {
    const html = await render("mahasiswa/create", { 
        title: "Tambah Mahasiswa",
        error: null // Set null agar tidak error saat pertama kali buka
    }, c.req.raw);
    return c.html(html);
};

/**
 * 3. Proses Simpan Data (POST)
 * Menangani input dari form dan mengecek NIM duplikat
 */
export const store = async (c) => {
    try {
        // Ambil data dari inputan Form
        const body = await c.req.parseBody(); 
        
        // Panggil fungsi create di Model
        await mahasiswaModel.create(body);
        
        // Jika berhasil, arahkan kembali ke halaman daftar
        return c.redirect("/mahasiswa");

    } catch (error) {
        // Jika NIM Duplikat (Error Prisma P2002)
        if (error.code === 'P2002') {
            const html = await render("mahasiswa/create", { 
                title: "Tambah Mahasiswa",
                error: "Gagal! NIM sudah terdaftar, gunakan NIM lain.",
                oldData: await c.req.parseBody() 
            }, c.req.raw);
            return c.html(html);
        }
        
        console.error("Error Store:", error);
        return c.text("Terjadi kesalahan server saat menyimpan data", 500);
    }
};

/**
 * 4. Proses Hapus Data
 * Menggunakan fungsi remove dari mahasiswaModel
 */
export const destroy = async (c) => {
    try {
        const id = c.req.param('id');
        // Pastikan di model kamu namanya 'remove'
        await mahasiswaModel.remove(id); 
        
        return c.redirect("/mahasiswa");
    } catch (error) {
        console.error("Error Delete:", error);
        return c.text("Gagal menghapus data", 500);
    }
};