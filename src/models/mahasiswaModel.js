import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Ambil semua data dari Tabel Mahasiswa di MySQL
export const getAll = async () => {
    return await prisma.mahasiswa.findMany();
};

// Ambil satu data berdasarkan ID
export const getById = async (id) => {
    return await prisma.mahasiswa.findUnique({
        where: { id: Number(id) }
    });
};

// Simpan data baru ke MySQL
export const create = async (data) => {
    return await prisma.mahasiswa.create({
        data: {
            nama: data.nama,
            nim: data.nim,
        }
    });
};

// Update data di MySQL
export const update = async (id, data) => {
    return await prisma.mahasiswa.update({
        where: { id: Number(id) },
        data: {
            nama: data.nama,
            nim: data.nim,
        }
    });
};

// Hapus data dari MySQL
export const remove = async (id) => {
    return await prisma.mahasiswa.delete({
        where: { id: Number(id) }
    });
};