import { Hono } from "hono";
import { home } from "../controllers/homeController";
import * as mhs from "../controllers/mahasiswaController";
const router = new Hono();
router.get("/", home);
// CRUD Mahasiswa
router.get("/mahasiswa", mhs.index);
router.get("/mahasiswa/create", mhs.createForm);
router.post("/mahasiswa", mhs.store);
router.get("/mahasiswa/edit/:id", mhs.editForm);
router.post("/mahasiswa/update/:id", mhs.updateData);
router.get("/mahasiswa/delete/:id", mhs.destroy);
export default router;