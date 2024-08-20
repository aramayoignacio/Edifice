import { Box, Button, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { createBuilding, createUser, getAllBuildings, getAllUsers } from "../api/requests";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";

export const AddUserForm = ({ handleClose }) => {
    const [buildings, setBuildings] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ username: '', password: '', buildingIds: [] });

    useEffect(() => {
        const fetchBuildings = async () => {
            const { success, data } = await getAllBuildings();
            if (success) {
                setBuildings(data);
            } else {
                toast.error("Error recuperando edificios")
            }
        };

        fetchBuildings()

    }, [])

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { success } = await createUser(form);
        if (success) {
            toast("Creado!");
            handleClose();
        }
        setLoading(false);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box>
            <Typography sx={{ fontSize: "20px" }}>
                Add new User
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    name="username"
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    value={form.username}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    required
                    sx={{ marginTop: "20px" }}
                />
                <TextField
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    variant="outlined"
                    fullWidth
                    value={form.password}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    required
                    sx={{ marginTop: "20px" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <InputLabel sx={{ marginTop: "20px" }}>Edificios</InputLabel>
                <Select
                    value={form.buildingIds}
                    name="buildingIds"
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    multiple
                    fullWidth
                    placeholder="Edificios"
                >
                    {
                        buildings.map((b) => (
                            <MenuItem value={b.id} key={b.id}>{b.name}</MenuItem>
                        ))
                    }
                </Select>
                <Button type="submit" variant="outlined" color="primary" fullWidth sx={{ marginTop: "20px" }}>
                    {loading ? "Creando..." : "Crear"}
                </Button>
            </form>
        </Box >
    )
}

export const AddBuilding = ({ handleClose }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', address: '', floors: 0 , userIds: []});

    useEffect(() => {
        const fetchUsers = async () => {
            const { success, data } = await getAllUsers();
            if (success) {
                setUsers(data);
                console.log(data)
            } else {
                toast.error("Error recuperando usuarios")
            }
        };

        fetchUsers()

    }, [])

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { success } = await createBuilding(form);
        if (success) {
            toast("Creado!");
            handleClose();
        }
        setLoading(false);
    }

    return (
        <Box>
            <Typography sx={{ fontSize: "20px" }}>
                Add new Building
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={form.name}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    required
                    sx={{ marginTop: "20px" }}
                />
                <TextField
                    label="Dirección"
                    name="address"
                    variant="outlined"
                    fullWidth
                    value={form.address}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    required
                    sx={{ marginTop: "20px" }}
                />
                <TextField
                    label="N° de pisos"
                    name="floors"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={form.floors}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    required
                    sx={{ marginTop: "20px" }}
                />
                <InputLabel sx={{ marginTop: "20px" }}>Usuarios</InputLabel>
                <Select
                    value={form.userIds}
                    name="userIds"
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    multiple
                    fullWidth
                    disabled={users.length===0}
                >
                    {
                        users.map((b) => (
                            <MenuItem value={b.id} key={b.id}>{b.username}</MenuItem>
                        ))
                    }
                </Select>
                <Button type="submit" variant="outlined" color="primary" fullWidth sx={{ marginTop: "20px" }}>
                    {loading ? "Creando..." : "Crear"}
                </Button>
            </form>
        </Box >
    )
}