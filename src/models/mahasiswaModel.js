let mahasiswa = [
{ id: 1, nama: "Budi", nim: "12345" },
];
export const getAll = () => mahasiswa;
export const getById = (id) =>
mahasiswa.find((m) => m.id == id);
export const create = (data) => {
const newData = {
id: Date.now(),
...data,
};
mahasiswa.push(newData);
};
export const update = (id, data) => {
mahasiswa = mahasiswa.map((m) =>
m.id == id ? { ...m, ...data } : m
);
};
export const remove = (id) => {
mahasiswa = mahasiswa.filter((m) => m.id != id);
};