import { render } from "../config/viewEngine";
import * as model from "../models/mahasiswaModel";

// 1. LIST (Menampilkan Semua Data)
export const index = async (c) => {
    const data = await model.getAll(); 
    const success = c.req.query("success");
    const error = c.req.query("error");
    return c.html(
        await render("mahasiswa/index", {
            title: "Data Mahasiswa",
            mahasiswa: data,
            success,
            error,
        }, c)
    );
};

// 2. FORM CREATE (Menampilkan Form Tambah)
export const createForm = async (c) => {
    const error = c.req.query("error"); // Biar pesan error muncul di form
    return c.html(
        await render("mahasiswa/create", {
            title: "Tambah Mahasiswa",
            error,
        }, c)
    );
};

// 3. STORE (Proses Simpan Data - DENGAN TRY CATCH)
export const store = async (c) => {
    const body = await c.req.parseBody();
    
    if (!body.nama || !body.nim) {
        return c.redirect("/mahasiswa/create?error=Semua field wajib diisi");
    }

    try {
        await model.create({
            nama: body.nama,
            nim: body.nim,
        });
        return c.redirect("/mahasiswa?success=Data berhasil ditambahkan");
    } catch (err) {
        // Jika NIM kembar, Prisma akan melempar error code 'P2002'
        if (err.code === 'P2002') {
            return c.redirect("/mahasiswa/create?error=NIM sudah terdaftar! Gunakan NIM lain.");
        }
        return c.redirect("/mahasiswa/create?error=Terjadi kesalahan pada database");
    }
};

// 4. FORM EDIT (Menampilkan Form Edit)
export const editForm = async (c) => {
    const id = c.req.param("id");
    const error = c.req.query("error");
    const data = await model.getById(id);
    return c.html(
        await render("mahasiswa/edit", {
            title: "Edit Mahasiswa",
            mhs: data, // Sesuaikan dengan variabel di file edit.ejs kamu
            error,
        }, c)
    );
};

// 5. UPDATE (Proses Update Data - DENGAN TRY CATCH)
export const updateData = async (c) => {
    const id = c.req.param("id");
    const body = await c.req.parseBody();
    
    if (!body.nama || !body.nim) {
        return c.redirect(`/mahasiswa/edit/${id}?error=Field tidak boleh kosong`);
    }

    try {
        await model.update(id, {
            nama: body.nama,
            nim: body.nim,
        });
        return c.redirect("/mahasiswa?success=Data berhasil diupdate");
    } catch (err) {
        if (err.code === 'P2002') {
            return c.redirect(`/mahasiswa/edit/${id}?error=NIM sudah digunakan mahasiswa lain!`);
        }
        return c.redirect(`/mahasiswa/edit/${id}?error=Gagal mengupdate data`);
    }
};

// 6. DELETE (Proses Hapus Data)
export const destroy = async (c) => {
    const id = c.req.param("id");
    await model.remove(id);
    return c.redirect("/mahasiswa?success=Data berhasil dihapus");
};