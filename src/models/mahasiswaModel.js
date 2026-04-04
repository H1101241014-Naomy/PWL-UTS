import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); 

export const getAll = async () => {
    try {
        return await prisma.mahasiswa.findMany();
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        return [];
    }
};


export const getById = async (id) => {
    try {
        return await prisma.mahasiswa.findUnique({
            where: { id: Number(id) },
        });
    } catch (error) {
        console.error(`Gagal mengambil data ID ${id}:`, error);
        return null;
    }
};

export const create = async (data) => {
    try {
        return await prisma.mahasiswa.create({
            data: {
                nama: data.nama,
                nim: data.nim,
            },
        });
    } catch (error) {
        console.error("Gagal menambah mahasiswa:", error);
        throw error;
    }
};


export const update = async (id, data) => {
    try {
        return await prisma.mahasiswa.update({
            where: { id: Number(id) },
            data: {
                nama: data.nama,
                nim: data.nim,
            },
        });
    } catch (error) {
        console.error(`Gagal memperbarui ID ${id}:`, error);
        throw error;
    }
};

export const remove = async (id) => {
    try {
        return await prisma.mahasiswa.delete({
            where: { id: Number(id) },
        });
    } catch (error) {
        console.error(`Gagal menghapus ID ${id}:`, error);
        throw error;
    }
};