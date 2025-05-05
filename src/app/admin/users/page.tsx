'use client';

import axios from 'axios';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/app/components/ui/dialog";


function formatTurma(turma: Usuario["turma"]) {
    if (turma === "INFOA3" || turma === "INFOB3") {
        return "3º Info";
    }
    return "Professor";
}

interface Usuario {
    id: number;
    nome: string;
    telefone: string;
    camisa: "BEGE" | "PRETA";
    turma: "INFOB3" | "INFOA3" | "PROFESSOR";
    tamanho: "PP" | "P" | "M" | "G" | "GG" | "XGG";
    estilo: "NORMAL" | "OVERSIZED" | "BABY_LOCK";
    pagamento: "PIX" | "FISICO";
    valor: number;
    status: "PAGO" | "PENDENTE";
}

export default function Dashboard() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [filtro, setFiltro] = useState('');
    const [statusFiltro, setStatusFiltro] = useState<"" | "PAGO" | "PENDENTE">('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
    const [usuarioParaExcluir, setUsuarioParaExcluir] = useState<Usuario | null>(null);

    const getUsers = () => {
        axios.get("/api/usersForm").then(response => setUsuarios(response.data.message.data))
    }

    useEffect(() => {
        const savedPassword = localStorage.getItem('adminPassword');
        if (!savedPassword) {
            router.push('/Login');
        }
    }, [router]);

    useEffect(() => {
        getUsers()
    }, [])

    const usuariosFiltrados = usuarios.filter((u) => {
        return (
            u.nome?.toLowerCase().includes(filtro.toLowerCase()) &&
            (statusFiltro ? u.status === statusFiltro : true)
        );
    });

    const handleAdd = (novo: Omit<Usuario, "id">) => {
        axios.post("/api/usersForm", novo)
        getUsers()
        setModalOpen(false);
    };

    const handleEdit = (editado: Usuario) => {
        setUsuarios((prev) => prev.map((u) => (u.id === editado.id ? editado : u)));
        axios.put(`/api/usersForm/${editado.id}`, editado)
        setEditModalOpen(false);
    };

    const handleDelete = () => {
        if (usuarioParaExcluir) {
            setUsuarios((prev) => prev.filter((u) => u.id !== usuarioParaExcluir.id));
            axios.delete(`/api/usersForm/${usuarioParaExcluir.id}`)
            setDeleteModalOpen(false);
        }
    };

    return (
        <div className="min-h-screen w-screen bg-[#f9fafb] p-6">
            <h1 className="text-3xl font-bold text-[#07038C] mb-6">Dashboard de Camisetas</h1>

            <div className="flex justify-between mb-4 items-center gap-4">
                <Input
                    placeholder="Buscar por nome..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="max-w-sm"
                />

                <select
                    value={statusFiltro}
                    onChange={(e) => setStatusFiltro(e.target.value as any)}
                    className="border p-2 rounded-md"
                >
                    <option value="">Todos</option>
                    <option value="PAGO">Pago</option>
                    <option value="PENDENTE">Pendente</option>
                </select>

                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#07038C] hover:bg-[#24208C] text-white">Adicionar Usuário</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogTitle>Novo Usuário</DialogTitle>
                        <AddUserForm onSubmit={handleAdd} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="overflow-x-auto border rounded-lg">
                <table className="hidden md:table w-full table-auto text-left">
                    <thead className="bg-[#07038C] text-white">
                        <tr>
                            <th className="p-2">Nome</th>
                            <th className="p-2">Telefone</th>
                            <th className="p-2">Turma</th>
                            <th className="p-2">Camisa</th>
                            <th className="p-2">Tamanho</th>
                            <th className="p-2">Estilo</th>
                            <th className="p-2">Pagamento</th>
                            <th className="p-2">Valor</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map((usuario) => (
                            <tr key={usuario.id} className="border-b">
                                <td className="p-2">{usuario.nome}</td>
                                <td className="p-2">
                                    <a
                                        href={`https://wa.me/${usuario.telefone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 underline text-sm"
                                    >
                                        {usuario.telefone}
                                    </a></td>
                                <td className="p-2 font-bold">{formatTurma(usuario.turma)}</td>
                                <td className="p-2">{usuario.camisa}</td>
                                <td className="p-2">{usuario.tamanho}</td>
                                <td className="p-2">{usuario.estilo}</td>
                                <td className="p-2 font-bold">{usuario.pagamento}</td>
                                <td className="p-2 font-bold">R$ {usuario.valor}</td>
                                <td className="p-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm ${usuario.status === "PAGO"
                                            ? "bg-green-200 text-green-800"
                                            : "bg-yellow-200 text-yellow-800"
                                            }`}
                                    >
                                        {usuario.status}
                                    </span>
                                </td>
                                <td className="p-2 space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setUsuarioEditando(usuario);
                                            setEditModalOpen(true);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                            setUsuarioParaExcluir(usuario);
                                            setDeleteModalOpen(true);
                                        }}
                                    >
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile layout */}
                <div className="md:hidden space-y-4 p-2">
                    {usuariosFiltrados.map((usuario) => (
                        <div
                            key={usuario.id}
                            className="border rounded-lg shadow-sm p-4 space-y-2 bg-white"
                        >
                            <div>
                                <strong>Nome:</strong> {usuario.nome}
                            </div>
                            <div>
                                <strong>Telefone:</strong> {usuario.telefone}
                            </div>
                            <div>
                                <strong>Turma:</strong> {formatTurma(usuario.turma)}
                            </div>
                            <div>
                                <strong>Camisa:</strong> {usuario.camisa}
                            </div>
                            <div>
                                <strong>Tamanho:</strong> {usuario.tamanho}
                            </div>
                            <div>
                                <strong>Estilo:</strong> {usuario.estilo}
                            </div>
                            <div>
                                <strong>Pagamento:</strong> {usuario.pagamento}
                            </div>
                            <div>
                                <strong>Valor:</strong> R$ {usuario.valor}
                            </div>
                            <div>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`px-2 py-1 rounded-full text-sm ${usuario.status === "PAGO"
                                        ? "bg-green-200 text-green-800"
                                        : "bg-yellow-200 text-yellow-800"
                                        }`}
                                >
                                    {usuario.status}
                                </span>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setUsuarioEditando(usuario);
                                        setEditModalOpen(true);
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                        setUsuarioParaExcluir(usuario);
                                        setDeleteModalOpen(true);
                                    }}
                                >
                                    Excluir
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogTitle>Editar Usuário</DialogTitle>
                    {usuarioEditando && <AddUserForm onSubmit={handleEdit} initialData={usuarioEditando} />}
                </DialogContent>
            </Dialog>

            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                    <p>Tem certeza que deseja excluir este usuário?</p>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Sim, excluir
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

type AddUserFormProps =
    | { onSubmit: (data: Omit<Usuario, "id">) => void; initialData?: undefined }
    | { onSubmit: (data: Usuario) => void; initialData: Usuario };

function AddUserForm(props: AddUserFormProps) {
    const isEdit = !!props.initialData;
    const [formData, setFormData] = useState<Omit<Usuario, "id">>(
        isEdit
            ? { ...props.initialData }
            : {
                nome: "",
                telefone: "",
                camisa: "BEGE",
                turma: "INFOA3",
                tamanho: "M",
                estilo: "NORMAL",
                pagamento: "PIX",
                valor: 0,
                status: "PENDENTE",
            }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        const data = { ...formData, valor: Number(formData.valor) };
        if (isEdit) {
            props.onSubmit({ ...(data as Usuario), id: props.initialData.id });
        } else {
            props.onSubmit(data);
        }
    };

    return (
        <div className="space-y-4">
            <Input placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} />
            <Input placeholder="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
            <Input placeholder="Valor" type="number" name="valor" value={formData.valor} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-2">
                <select name="camisa" value={formData.camisa} onChange={handleChange} className="border p-2 rounded-md">
                    <option value="BEGE">Bege</option>
                    <option value="PRETA">Preta</option>
                </select>
                <select name="turma" value={formData.turma} onChange={handleChange} className="border p-2 rounded-md">
                    <option value="INFOA3">3º Info A</option>
                    <option value="INFOB3">3º Info B</option>
                    <option value="PROFESSOR">Professor</option>
                </select>
                <select name="tamanho" value={formData.tamanho} onChange={handleChange} className="border p-2 rounded-md">
                    <option value="PP">PP</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XGG">XGG</option>
                </select>
                <select name="estilo" value={formData.estilo} onChange={handleChange} className="border p-2 rounded-md">
                    <option value="NORMAL">Normal</option>
                    <option value="OVERSIZED">Oversized</option>
                    <option value="BABY_LOCK">Baby Lock</option>
                </select>
                <select name="pagamento" value={formData.pagamento} onChange={handleChange} className="border p-2 rounded-md">
                    <option value="PIX">PIX</option>
                    <option value="FISICO">Espécie</option>
                </select>
                <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded-md">
                    <option value="PENDENTE">Pendente</option>
                    <option value="PAGO">Pago</option>
                </select>
            </div>

            <Button className="w-full bg-[#07038C] hover:bg-[#24208C] text-white" onClick={handleSubmit}>
                Salvar
            </Button>
        </div>
    );
}
