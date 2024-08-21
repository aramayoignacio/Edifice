import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  addGarage,
  addSector,
  addUnit,
  createBuilding,
  createUser,
  editBuilding,
  editUnit,
  getAllBuildings,
  getAllUnitTypes,
  getAllUsers,
  getSectors,
  getSectorsByBuilding,
  getUnit,
} from "../api/requests";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import CustomModal from "../components/Modal";

export const AddUserForm = ({ handleClose }) => {
  const [buildings, setBuildings] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    buildingIds: [],
  });

  useEffect(() => {
    const fetchBuildings = async () => {
      const { success, data } = await getAllBuildings();
      if (success) {
        setBuildings(data);
      } else {
        toast.error("Error recuperando edificios");
      }
    };

    fetchBuildings();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { success } = await createUser(form);
    if (success) {
      toast("Creado!");
      handleClose();
    }
    setLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>Add new User</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="username"
          label="Usuario"
          variant="outlined"
          fullWidth
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          required
          sx={{ marginTop: "20px" }}
        />
        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          variant="outlined"
          fullWidth
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
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
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          multiple
          fullWidth
          placeholder="Edificios"
        >
          {buildings.map((b) => (
            <MenuItem value={b.id} key={b.id}>
              {b.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          {loading ? "Creando..." : "Crear"}
        </Button>
      </form>
    </Box>
  );
};

export const AddBuildingForm = ({ handleClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    floors: 0,
    userIds: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const { success, data } = await getAllUsers();
      if (success) {
        setUsers(data);
      } else {
        toast.error("Error recuperando usuarios");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { success } = await createBuilding(form);
    if (success) {
      toast("Creado!");
      handleClose();
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>Add new Building</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          required
          sx={{ marginTop: "20px" }}
        />
        <TextField
          label="Dirección"
          name="address"
          variant="outlined"
          fullWidth
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
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
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          required
          sx={{ marginTop: "20px" }}
        />
        <InputLabel sx={{ marginTop: "20px" }}>Usuarios</InputLabel>
        <Select
          value={form.userIds}
          name="userIds"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          multiple
          fullWidth
          disabled={users.length === 0}
        >
          {users.map((b) => (
            <MenuItem value={b.id} key={b.id}>
              {b.username}
            </MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          {loading ? "Creando..." : "Crear"}
        </Button>
      </form>
    </Box>
  );
};

export const EditBuildingForm = ({ handleClose, building, update }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: building.id,
    name: building.name,
    userIds: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const { success, data } = await getAllUsers();
      if (success) {
        const usersIds = building.users.map((u) => u.id);
        const usersToAdd = data.filter(
          (u) => !usersIds.includes(u.id) && !u.isAdmin
        );
        setUsers(usersToAdd);
      } else {
        toast.error("Error recuperando usuarios");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { success } = await editBuilding(form);
    if (success) {
      toast("Guardado!");
      handleClose();
      update();
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>Editar edificio</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          required
          sx={{ marginTop: "20px" }}
        />
        <InputLabel sx={{ marginTop: "20px" }}>Agregar usuarios</InputLabel>
        <Select
          value={form.userIds}
          name="userIds"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          multiple
          fullWidth
          disabled={users.length === 0}
        >
          {users.map((b) => (
            <MenuItem value={b.id} key={b.id}>
              {b.username}
            </MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </Box>
  );
};

export const AddSectorForm = ({ handleClose, building, update }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    floorId: building.floors[0].id,
    name: "",
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { success } = await addSector(form);
    if (success) {
      toast("Guardado!");
      handleClose();
      update();
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>Añadir sector</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          required
          sx={{ marginTop: "20px" }}
        />
        <InputLabel sx={{ marginTop: "20px" }}>Piso</InputLabel>
        <Select
          value={form.floorId}
          name="floorId"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          fullWidth
          disabled={building.floors === 0}
          required
        >
          {building.floors.map((f) => (
            <MenuItem value={f.id} key={f.id}>
              {f.numberInBuilding}
            </MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </Box>
  );
};

export const AddGarageForm = ({ handleClose, building, update }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    covered: false,
    fixed: false,
    storage: false,
    numberInBuilding: 0,
    buildingId: building.id,
  });
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { success } = await addGarage(form);
    if (success) {
      toast("Guardado!");
      handleClose();
      update();
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>Añadir cochera</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="numberInBuilding"
          label="Numero"
          variant="outlined"
          fullWidth
          type="number"
          value={form.numberInBuilding}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          required
          sx={{ marginTop: "20px" }}
        />
        <Box display="flex" flexDirection="row" alignItems="center" mt="20px">
          <InputLabel>Cubierta</InputLabel>
          <Checkbox
            name="covered"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.checked })
            }
          />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" mt="20px">
          <InputLabel>Fija</InputLabel>
          <Checkbox
            name="fixed"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.checked })
            }
          />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" mt="20px">
          <InputLabel>De almacenaje</InputLabel>
          <Checkbox
            name="storage"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.checked })
            }
          />
        </Box>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Creando"}
        </Button>
      </form>
    </Box>
  );
};

export const AddUnitForm = ({ handleClose, building, update }) => {
  const [loading, setLoading] = useState(false);
  const [unitTypes, setUnitTypes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    floorId: building.floors[0].id,
    sectorId: building.floors[0].sectors[0].id,
    keys: false,
    typeId: 1,
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { success } = await addUnit(form);
    if (success) {
      toast("Guardado!");
      handleClose();
      update();
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        const { success, data } = await getAllUnitTypes();
        success && setUnitTypes(data);
      } catch (err) {
        setLoading(false);
      }
      setLoading(false);
    };

    fetchTypes();
  }, []);

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>Añadir unidad</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          required
          sx={{ marginTop: "20px" }}
        />
        <InputLabel sx={{ marginTop: "20px" }}>Piso</InputLabel>
        <Select
          value={form.floorId}
          name="floorId"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          fullWidth
          disabled={building.floors === 0}
          required
        >
          {building.floors.map((f) => (
            <MenuItem value={f.id} key={f.id}>
              {f.numberInBuilding}
            </MenuItem>
          ))}
        </Select>

        <InputLabel sx={{ marginTop: "20px" }}>Sector</InputLabel>
        <Select
          value={form.sectorId}
          name="sectorId"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          fullWidth
          disabled={building.floors.length === 0}
          required
        >
          {building.floors
            .find((f) => f.id === form.floorId)
            .sectors.map((f) => (
              <MenuItem value={f.id} key={f.id}>
                {f.name}
              </MenuItem>
            ))}
        </Select>

        <InputLabel sx={{ marginTop: "20px" }}>Tipo</InputLabel>
        <Select
          value={form.typeId}
          name="typeId"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          fullWidth
          disabled={unitTypes.length === 0}
          required
        >
          {unitTypes.map((f) => (
            <MenuItem value={f.id} key={f.id}>
              {f.name}
            </MenuItem>
          ))}
        </Select>

        <Box display="flex" flexDirection="row" alignItems="center" mt="20px">
          <InputLabel>Llaves</InputLabel>
          <Checkbox
            name="keys"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.checked })
            }
          />
        </Box>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Crear"}
        </Button>
      </form>
    </Box>
  );
};

export const EditUnitForm = ({ handleClose, unitId, update }) => {
  const [loading, setLoading] = useState(false);
  const [unitTypes, setUnitTypes] = useState([]);
  const [unit, setUnit] = useState();
  const [sectors, setSectors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    keys: false,
    typeId: 1,
    sectorId: 1,
  });
  const [updateData, setUpdateData] = useState(false);
  const [ownersModal, setOwnersModal] = useState(false);
  const [tenantsModal, setTenantsModal] = useState(false);

  const openOwnersModal = () => setOwnersModal(true);
  const openTenantsModal = () => setTenantsModal(true);
  const closeOwnersModal = () => setOwnersModal(false);
  const closeTenantsModal = () => setTenantsModal(false);

  const handleUpdate = () => setUpdateData(!update);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true);
        const { success, data } = await getUnit(unitId);
        if (success) {
          setUnit(data);
          const { success: sectorSuccess, data: sectorData } =
            await getSectorsByBuilding(data.sector.floor.building.id);
          sectorSuccess && setSectors(sectorData);
          setForm((prev) => ({
            ...prev,
            name: data.name,
            keys: data.keys,
            typeId: data.type.id,
            sectorId: data.sector.id,
          }));
        }
      } catch (err) {
        setLoading(false);
      }
      setLoading(false);
    };

    const fetchTypes = async () => {
      try {
        const { success, data } = await getAllUnitTypes();
        if (success) {
          setUnitTypes(data);
        }
      } catch (err) {
      }
    };

    fetchTypes();
    fetchUnit();
  }, [updateData]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { success } = await editUnit(form);
    if (success) {
      toast("Guardado!");
      handleClose();
      update();
    }
    setLoading(false);
  };

  if (loading) {
    return <CircularProgress size={30} />;
  }

  return (
    <Box>
      <Typography sx={{ fontSize: "20px" }}>Editar unidad</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          required
          sx={{ marginTop: "20px" }}
        />
        <InputLabel sx={{ marginTop: "20px" }}>Sector</InputLabel>
        <Select
          value={form.sectorId}
          name="sectorId"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          fullWidth
          required
        >
          {sectors?.map((f) => (
            <MenuItem value={f.id} key={f.id}>
              {f.floor.numberInBuilding} - {f.name}
            </MenuItem>
          ))}
        </Select>
        <Box display="flex" flexDirection="row" alignItems="center" mt="20px">
          <InputLabel>Llaves</InputLabel>
          <Checkbox
            name="keys"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.checked })
            }
          />
        </Box>
        <Box display="flex" flexDirection="row" gap="20px">
          <Button
            // type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={loading}
            onClick={openOwnersModal}
          >
            {unit?.owners.length > 0 ? "Editar" : "Crear"} propietarios
          </Button>
          <Button
            // type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            disabled={loading}
            onClick={openTenantsModal}
          >
            {unit?.tenants.length > 0 ? "Editar" : "Crear"} inquilinos
          </Button>
        </Box>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
      {ownersModal && (
        <CustomModal
          open={ownersModal}
          handleClose={closeOwnersModal}
          children={<h1>editar propietarios</h1>}
        />
      )}
      {tenantsModal && (
        <CustomModal
          open={tenantsModal}
          handleClose={closeTenantsModal}
          children={<h1>editar inquilinios</h1>}
        />
      )}
    </Box>
  );
};

const HandleOwners = ({ handleClose, unitId, update }) => {};
